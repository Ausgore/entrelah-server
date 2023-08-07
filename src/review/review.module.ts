import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Module({
	imports: [TypeOrmModule.forFeature([Review, User])],
	controllers: [ReviewController],
	providers: [ReviewService, UserService],
	exports: [TypeOrmModule]
})
export class ReviewModule {};