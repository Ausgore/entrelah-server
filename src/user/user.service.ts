import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { GigService } from 'src/gig/gig.service';
import { AttachmentService } from 'src/attachment/attachment.service';
import { CreateAttachmentDto } from 'src/attachment/dtos/CreateAttachment.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		private readonly gigService: GigService,
		private readonly attachmentService: AttachmentService) { }

	create(data: Partial<User>): Promise<User> {
		const user = this.userRepo.create(data);
		return this.userRepo.save(user);
	}

	deleteUserById(id: string): Promise<DeleteResult> {
		return this.userRepo.delete({ id });
	}

	async getUsers(where?: FindOptionsWhere<User>): Promise<User[]> {
		const users = await this.userRepo.find({ where, relations: ["reviewsReceived", "reviewsReceived.reviewer", "reviewsReceived.reviewee", "gigs", "gigs.packages", "gigs.owner", "gigs.usersWhoSaved", "gigs.reviews", "avatar", "orders"], order: { gigs: { createdAt: "ASC" } } });
		for (const user of users) {
			if (user.avatar) {
				const attachment = await this.attachmentService.getAttachmentById(user.avatar.id);
				user.avatar = attachment;
			}
		}

		return users;
	}

	async saveGig(id: string, gigId: string) {
		const user = await this.getUserById(id);
		const gig = await this.gigService.getGigById(gigId);

		user.savedGigs.push(gig);
		return await this.userRepo.save(user);
	}

	async unsaveGig(id: string, gigId: string) {
		const user = await this.getUserById(id);

		user.savedGigs = user.savedGigs.filter(gig => gig.id != gigId);
		return await this.userRepo.save(user);
	}

	async getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
		const user = await this.userRepo.findOne({ where, relations: ["reviewsReceived", "reviewsReceived.reviewer", "reviewsReceived.reviewee", "gigs", "gigs.packages", "gigs.owner", "gigs.usersWhoSaved", "savedGigs", "gigs.reviews", "avatar", "orders"], order: { gigs: { createdAt: "ASC" } } }).catch(() => null);
		if (!user) throw new NotFoundException("User cannot be found");

		if (user.avatar) {
			const attachment = await this.attachmentService.getAttachmentById(user.avatar.id);
			user.avatar = attachment;
		}
		return user;
	}

	async createUserAvatar(userId: string, data: CreateAttachmentDto): Promise<User> {
		const user = await this.getUserById(userId);
		const attachment = await this.attachmentService.createAttachment(data);
		const updatedUser = await this.updateUserById(userId, { avatarId: attachment.id });
		if (user.avatar) await this.attachmentService.deleteAttachmentById(user.avatarId); 
		return updatedUser;
	}

	getUserById(id: string): Promise<User> {
		return this.getUserBy({ id });
	}

	getUserByUsername(username: string): Promise<User> {
		return this.getUserBy({ username });
	}

	async updateUserById(id: string, user: Partial<User>): Promise<User> {
		await this.userRepo.update({ id }, user);
		return await this.getUserById(id);
	}
}