import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { UserService } from "src/user/user.service";
import { GigService } from "src/gig/gig.service";
import { User } from "src/user/user.entity";
import { Gig } from "src/gig/gig.entity";
import { Attachment } from "src/attachment/attachment.entity";
import { AttachmentService } from "src/attachment/attachment.service";
import { GigAttachment } from "src/gig/entities/gigAttachment.entity";
import { Package } from "src/package/package.entity";
import { PackageService } from "src/package/package.service";
import { ConfigService } from "@nestjs/config";
import { OrderEvent } from "./entities/orderEvent.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Order, User, Gig, Attachment, GigAttachment, Package, OrderEvent])],
	providers: [OrderService, UserService, GigService, AttachmentService, PackageService, ConfigService],
	controllers: [OrderController],
	exports: [TypeOrmModule]
})
export class OrderModule {};