import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from "./message.entity";
import { MessageController } from "./message.controller";
import { Attachment } from "src/attachment/attachment.entity";
import { AttachmentService } from "src/attachment/attachment.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Attachment])],
  controllers: [MessageController],
  providers: [AttachmentService, ConfigService],
  exports: [TypeOrmModule],
})
export class MessageModule {};
