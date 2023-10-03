import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attachment } from "./attachment.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateAttachmentDto } from "./dtos/CreateAttachment.dto";
import { ConfigService } from "@nestjs/config";
import { promises as fs } from "fs";

@Injectable()
export class AttachmentService {
	constructor(
		@InjectRepository(Attachment) private attachmentRepo: Repository<Attachment>,
		private configService: ConfigService) { };

	async createAttachment(data: CreateAttachmentDto) {
		const buffer = Buffer.from(data.base64Data, "base64");
		const createData: Partial<Attachment> = { filename: data.filename, extension: data.filename.split(".")[1], filesize: data.filesize, contentType: data.contentType, data: buffer };
		if (this.configService.get("ATTACHMENTBLOBSTORAGE") == "filesystem") createData.data = null;

		const attachment = await this.attachmentRepo.save(this.attachmentRepo.create(createData));
		if (this.configService.get("ATTACHMENTBLOBSTORAGE") == "filesystem") {
			await fs.access(`attachments/${attachment.id}`).catch(async () => await fs.mkdir(`attachments/${attachment.id}`, { recursive: true }));
			await fs.writeFile(`attachments/${attachment.id}/${data.filename}`, buffer);
			attachment.data = buffer;
		}

		return attachment;
	}

	async getAttachmentBy(where?: FindOptionsWhere<Attachment>) {
		const attachment = await this.attachmentRepo.findOne({ where });
		if (this.configService.get("ATTACHMENTBLOBSTORAGE") == "filesystem") {
			const buffer = await fs.readFile(`attachments/${attachment.id}/${attachment.filename}`);
			attachment.data = buffer;
		}
		return attachment;
	}

	getAttachmentById(id: string) {
		return this.getAttachmentBy({ id });
	}

	async getAttachments() {
		const attachments = await this.attachmentRepo.find();
		if (this.configService.get("ATTACHMENTBLOBSTORAGE") == "filesystem") {
			const promises = attachments.map(async a => {
				const buffer = await fs.readFile(`attachments/${a.id}/${a.filename}`);
				a.data = buffer;
				return a;
			});
			return await Promise.all(promises);
		}
		return attachments;
	}

	async deleteAttachmentById(id: string) {
		const attachment = await this.getAttachmentById(id);
		await fs.unlink(`attachments/${id}/${attachment.filename}`);
		fs.rmdir(`attachments/${id}`);
		this.attachmentRepo.delete({ id });
		return attachment;
	}
	
	async clearAttachments() {
		return this.attachmentRepo.delete({});
	}
}