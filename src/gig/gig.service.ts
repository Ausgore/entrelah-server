import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gig } from 'src/gig/gig.entity';
import { PackageService } from 'src/package/package.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { GigAttachment } from './entities/gigAttachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { CreateGigAttachmentDto } from './dtos/CreateGigAttachment.dto';
import { GigAttachmentType } from './typings/enums';

@Injectable()
export class GigService {
	constructor(
		@InjectRepository(Gig) private gigRepo: Repository<Gig>,
		@InjectRepository(GigAttachment) private gigAttachmentRepo: Repository<GigAttachment>,
		private attachmentService: AttachmentService,
		private packageService: PackageService) { }

	async getGigsWithSimilarTitle(query: string, page: number = 1) {
		const limit = 48;

		const words = query.split(" ");
		const queryBuilder = this.gigRepo
			.createQueryBuilder("gig")
			.leftJoinAndSelect("gig.packages", "packages")
			.innerJoinAndSelect("gig.owner", "owner")
			.where("gig.title ILIKE ANY(:words)", { words: words.map(w => `%${w}%`) })
			.andWhere("gig.status = :status", { status: 1 })
			.orderBy("gig.createdAt", "ASC")
			.skip((page - 1) * limit)
			.take(limit);
		const gigs = await queryBuilder.getMany();
		for (const gig of gigs) {
			gig.attachments = [await this.getFirstGigAttachment(gig.id)];
			if (gig.owner.avatarId) gig.owner.avatar = await this.attachmentService.getAttachmentById(gig.owner.avatarId);
		}

		const countQuery = this.gigRepo
			.createQueryBuilder("gig")
			.where("gig.title ILIKE ANY(:words)", { words: words.map(w => `%${w}%`) })
			.andWhere("gig.status = :status", { status: 1 });
		const totalCount = await countQuery.getCount();

		return {
			gigs,
			totalCount,
			totalPages: Math.ceil(totalCount / limit)
		}
	}

	async getGigsByCategory(categoryName: string, subcategoryName?: string, page: number = 1) {
		const limit = 48;

		let query = this.gigRepo
			.createQueryBuilder("gig")
			.leftJoinAndSelect("gig.packages", "packages")
			.innerJoinAndSelect("gig.subcategory", "subcategory")
			.innerJoinAndSelect("subcategory.category", "category")
			.innerJoinAndSelect("gig.owner", "owner")
			.where("category.name = :categoryName", { categoryName })
			.andWhere("gig.status = :status", { status: 1 })
			.orderBy("gig.createdAt", "ASC")
			.skip((page - 1) * limit)
			.take(limit);
		
		let countQuery = this.gigRepo
			.createQueryBuilder("gig")
			.innerJoinAndSelect("gig.subcategory", "subcategory")
			.innerJoinAndSelect("subcategory.category", "category")
			.where("category.name = :categoryName", { categoryName })
			.andWhere("gig.status = :status", { status: 1 });

		if (subcategoryName != "undefined") {
			query = query.andWhere("subcategory.name = :subcategoryName", { subcategoryName });
			countQuery = countQuery.andWhere("subcategory.name = :subcategoryName", { subcategoryName });
		}


		const gigs = await query.getMany();
		for (const gig of gigs) {
			gig.attachments = [await this.getFirstGigAttachment(gig.id)];
			if (gig.owner.avatarId) gig.owner.avatar = await this.attachmentService.getAttachmentById(gig.owner.avatarId);
		}
	
		const totalCount = await countQuery.getCount();
		return {
			gigs,
			totalCount,
			totalPages: Math.ceil(totalCount / limit)
		}
	}

	async createGigAttachment(gigId: string, data: CreateGigAttachmentDto) {
		const attachment = await this.attachmentService.createAttachment(data.attachment);
		const gigAttachment = this.gigAttachmentRepo.create({ attachmentId: attachment.id, gigId, type: data.type });
		return await this.gigAttachmentRepo.save(gigAttachment);
	}

	async getGigAttachments(gigId: string) {
		const gigAttachments = await this.gigAttachmentRepo.find({ where: { gigId } });
		for (const gigAttachment of gigAttachments) {
			const attachment = await this.attachmentService.getAttachmentById(gigAttachment.attachmentId);
			gigAttachment.attachment = attachment;
			delete gigAttachment.attachmentId;
		}
		return gigAttachments;
	}

	async getFirstGigAttachment(gigId: string) {
		const gigAttachments = await this.gigAttachmentRepo.find({ where: { gigId } });
		const gigAttachment = gigAttachments.filter(g => g.type == GigAttachmentType.Image)[0] ?? null;
		if (gigAttachment) {
			const attachment = await this.attachmentService.getAttachmentById(gigAttachment.attachmentId);
			gigAttachment.attachment = attachment;
			delete gigAttachment.attachmentId;
		}
		return gigAttachment;
	}

	getGigAttachmentBy(where?: FindOptionsWhere<GigAttachment>) {
		return this.gigAttachmentRepo.findOne({ where });
	}

	getGigAttachmentById(id: string) {
		return this.getGigAttachmentBy({ id });
	}

	async deleteGigAttachmentById(gigAttachmentId: string) {
		const gigAttachment = await this.getGigAttachmentById(gigAttachmentId);
		await this.gigAttachmentRepo.delete({ id: gigAttachmentId });
		await this.attachmentService.deleteAttachmentById(gigAttachment.attachmentId);
	}

	createGig(data: Partial<Gig>): Promise<Gig> {
		const gig = this.gigRepo.create(data);
		return this.gigRepo.save(gig);
	}

	async editGigById(id: string, data: Partial<Gig>) {
		let gig = await this.getGigBy({ id });
		if (Object.keys(data).length) {
			await this.gigRepo.update({ id }, data);
			gig = await this.getGigBy({ id });
		}
		return gig;
	}

	async getGigs(where?: FindOptionsWhere<Gig>): Promise<Gig[]> {
		return this.gigRepo.find({ where, relations: ["subcategory", "packages", "owner", "reviews", "faqs", "packages.orders"], order: { createdAt: "DESC" } });
	}

	async getGigBy(where: FindOptionsWhere<Gig> | FindOptionsWhere<Gig>[]): Promise<Gig> {
		const gig = await this.gigRepo.findOne({ where, relations: ["subcategory", "subcategory.category", "packages", "owner", "reviews", "faqs", "reviews.reviewee", "reviews.reviewer", "packages.orders"] }).catch(() => null);
		if (!gig) throw new NotFoundException("Gig cannot be found with that ID");
		return gig;
	}

	getGigById(id: string) {
		return this.getGigBy({ id });
	}

	async deleteGigById(id: string) {
		const attachments = await this.getGigAttachments(id);
		for (const attachment of attachments) await this.deleteGigAttachmentById(attachment.id);
		await this.packageService.clearPackages({ gigId: id });
		this.gigRepo.delete({ id });
		return { message: "Successfully deleted this gig and all packages associated with it" }
	}

	clearGigs(criteria?: FindOptionsWhere<Gig>) {
		return this.gigRepo.delete(criteria ?? {});
	}
}