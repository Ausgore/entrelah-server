import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Package } from "./package.entity";
import { PackageService } from "./package.service";
import { PackageController } from "./package.controller";
import { GigModule } from "src/gig/gig.module";
import { GigService } from "src/gig/gig.service";
import { Attachment } from "src/attachment/attachment.entity";
import { AttachmentService } from "src/attachment/attachment.service";
import { ConfigService } from "@nestjs/config";
import { Order } from "src/order/order.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Package, Attachment, Order]), forwardRef(() => GigModule)],
	providers: [PackageService, GigService, AttachmentService, ConfigService],
	controllers: [PackageController],
	exports: [TypeOrmModule]
})
export class PackageModule {};