import { Controller, Get, Query, Param, Body, Post, InternalServerErrorException, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/CreateReview.dto';
import { UserService } from 'src/user/user.service';
import { Review } from './review.entity';
import { ReviewType } from './typings/enums';
import { GigService } from 'src/gig/gig.service';

@Controller("review")
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly userService: UserService,
		private readonly gigService: GigService
	) { }

	@Get(":id")
	getReviewById(@Param("id") id: string) {
		return this.reviewService.getReviewById(id);
	}

	@Get()
	getReviews(@Query() query) {
		return this.reviewService.getReviews(query);
	}

	@Get("user/:id")
	async getReviewsForUser(@Param("id") id: string) {
		const reviews = await this.reviewService.getReviewsSentTo(id);
		const buyerReviews = reviews.filter(r => r.reviewType == ReviewType.Buyer).map(({accuracyRating, recommendationRating, communicationRating, reviewType, ...data }) => data);
		const sellerReviews = reviews.filter(r => r.reviewType == ReviewType.Seller).map(({ buyerRating, reviewType, ...data }) => data);
		return { buyerReviews, sellerReviews };
	}

	@Post("create")
	async createReview(@Body() body: CreateReviewDto) {
		const data: Partial<Review> = { reviewType: body.reviewType, message: body.message };

		if (body.senderId == body.receiverId) throw new InternalServerErrorException("Sender cannot send a review to themselves");

		const reviewer = await this.userService.getUserById(body.senderId);
		data.reviewerId = reviewer.id;
		const reviewee = await this.userService.getUserById(body.receiverId);
		data.revieweeId = reviewee.id;

		if (data.reviewType == ReviewType.Buyer) data.buyerRating = body.buyerRating;
		else {
			const gig = await this.gigService.getGigById(body.gigId);
			data.gigId = gig.id;
			data.communicationRating = body.communicationRating;
			data.recommendationRating = body.recommendationRating;
			data.accuracyRating = body.accuracyRating;
		}

		return this.reviewService.create(data);
	}

	@Delete("clear")
	clear() {
		this.reviewService.clearReviews();
		return { message: "All reviews have been deleted" };
	}
}