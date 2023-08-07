import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";
import { ReviewType } from "../typings/enums";
import { Review } from "../review.entity";

export class CreateReviewDto {
	@ApiProperty({ description: "The user's ID who wrote this review" })
	@IsNotEmpty()
	@IsString()
	senderId: string;

	@ApiProperty({ description: "The user's ID who is receiving this review" })
	@IsNotEmpty()
	@IsString()
	receiverId: string;

	@ApiProperty({ description: "Set whether this is a review for a seller or a buyer", enum: ReviewType })
	@IsNotEmpty()
	@IsEnum(ReviewType)
	reviewType: ReviewType;

	@ApiProperty({ description: "Rating for buyer", required: false })
	@ValidateIf((review: Review) => review.reviewType == ReviewType.Buyer)
	@IsInt()
	@Min(1)
	@Max(5)
	buyerRating: number;
	
	@ApiProperty({ description: "Rating for seller's communication", required: false })
	@ValidateIf((review: Review) => review.reviewType == ReviewType.Seller)
	@IsInt()
	@Min(1)
	@Max(5)
	communicationRating: number;

	@ApiProperty({ description: "Rating for whether seller should be recommended", required: false })
	@ValidateIf((review: Review) => review.reviewType == ReviewType.Seller)
	@IsInt()
	@Min(1)
	@Max(5)
	recommendationRating: number;

	@ApiProperty({ description: "Rating for seller's services", required: false })
	@ValidateIf((review: Review) => review.reviewType == ReviewType.Seller)
	@IsInt()
	@Min(1)
	@Max(5)
	accuracyRating: number;

	@ApiProperty({ description: "The review message" })
	@IsOptional()
	@IsString()
	message: string;

	@ApiProperty({ description: "The reviewed gig", required: false })
	@ValidateIf((review: Review) => review.reviewType == ReviewType.Seller)
	@IsString()
	gigId: string;
}