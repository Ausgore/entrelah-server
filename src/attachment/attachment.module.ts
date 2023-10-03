import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attachment } from "./attachment.entity";
import { AttachmentService } from "./attachment.service";
import { AttachmentController } from "./attachment.controller";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [TypeOrmModule.forFeature([Attachment])],
	controllers: [AttachmentController],
	providers: [AttachmentService, ConfigService],
	exports: [TypeOrmModule]
})
export class AttachmentModule {};
