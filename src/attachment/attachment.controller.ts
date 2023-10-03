import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { AttachmentService } from "./attachment.service";
import { CreateAttachmentDto } from './dtos/CreateAttachment.dto';

@Controller("attachment")
export class AttachmentController {
	constructor(private attachmentService: AttachmentService) {};

	@Post("create")
	createAttachment(@Body() body: CreateAttachmentDto) {
		return this.attachmentService.createAttachment(body);
	}

	@Get(":id")
	getAttachmentById(@Param("id") id: string) {
		return this.attachmentService.getAttachmentById(id);
	}

	@Get()
	async getAttachments() {
		return this.attachmentService.getAttachments();
	}

	@Delete("clear")
	clearAttachments() {
		return this.attachmentService.clearAttachments();
	}

	@Delete(":id")
	deleteAttachment(@Param("id") id: string) {
		return this.attachmentService.deleteAttachmentById(id);
	}
}