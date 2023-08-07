import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';


@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review) private reviewRepo: Repository<Review>, 
		private userService: UserService
	) {}

	create(data: Partial<Review>): Promise<Review> {
		const review = this.reviewRepo.create(data);
		return this.reviewRepo.save(review);
	}

	getReviews(where?: FindOptionsWhere<Review>): Promise<Review[]> {
		return this.reviewRepo.find({ where });
	}

	async getReviewBy(where: FindOptionsWhere<Review> | FindOptionsWhere<Review>[]): Promise<Review> {
		const review = await this.reviewRepo.findOne({ where, relations: ["reviewer", "reviewee"] }).catch(() => null);
		if (!review) throw new NotFoundException("Review cannot be found with that ID");
		return review;
	}

	getReviewById(id: string): Promise<Review> {
		return this.getReviewBy({ id });
	}
	
	async getReviewsSentTo(userId: string): Promise<Review[]> {
		const user = await this.userService.getUserById(userId);
		return this.getReviews({ revieweeId: user.id });
	}

	clearReviews() {
		return this.reviewRepo.clear();
	}
}