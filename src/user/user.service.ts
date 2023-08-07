import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DeleteResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

	create(data: Partial<User>): Promise<User> {
		const user = this.userRepo.create(data);
		return this.userRepo.save(user);
	}

	deleteUserById(id: string): Promise<DeleteResult> {
		return this.userRepo.delete({ id });
	}

	getUsers(where?: FindOptionsWhere<User>): Promise<User[]> {
		return this.userRepo.find({ where, relations: ["reviewsReceived", "reviewsReceived.reviewer", "reviewsReceived.reviewee"] });
	}

	async getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
		const user = await this.userRepo.findOne({ where, relations: ["reviewsReceived", "reviewsReceived.reviewer", "reviewsReceived.reviewee"] }).catch(() => null);
		if (!user) throw new NotFoundException("User cannot be found");
		return user;
	}

	getUserById(id: string): Promise<User> {
		return this.getUserBy({ id });
	}

	getUserByUsername(username: string): Promise<User> {
		return this.getUserBy({ username });
	}

	editUser(id: string, user: Partial<User>) {
		return this.userRepo.update({ id }, user);
	}
}
