import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { Gig } from "src/gig/gig.entity";
import { GigService } from "src/gig/gig.service";
import { Package } from "src/package/package.entity";
import { PackageService } from "src/package/package.service";
import { GigAttachment } from "src/gig/entities/gigAttachment.entity";
import { Attachment } from "src/attachment/attachment.entity";
import { AttachmentService } from "src/attachment/attachment.service";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [TypeOrmModule.forFeature([Review, User, Gig, Package, GigAttachment, Attachment])],
	controllers: [ReviewController],
	providers: [ReviewService, UserService, GigService, PackageService, AttachmentService, ConfigService],
	exports: [TypeOrmModule]
})
export class ReviewModule {};