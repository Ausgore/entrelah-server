import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { AttachmentService } from "src/attachment/attachment.service";

@Controller("message")
export class MessageController {
	constructor(
		@InjectRepository(Message) private readonly messageRepo: Repository<Message>,
		private readonly attachmentService: AttachmentService) { };

	@Get(":id/:id2?")
	async getLastMessagesPerConversation(@Param("id") id: string, @Param("id2") id2?: string) {
		if (!id2) {
			const subQuery = this.messageRepo
				.createQueryBuilder("subQuery")
				.select("MAX(subQuery.createdAt)", "maxCreatedAt")
				.where("subQuery.senderId = :id OR subQuery.receiverId = :id", { id })
				.groupBy("LEAST(subQuery.senderId, subQuery.receiverId), GREATEST(subQuery.senderId, subQuery.receiverId)");

			const messages = await this.messageRepo
				.createQueryBuilder("message")
				.leftJoinAndSelect("message.sender", "sender")
				.leftJoinAndSelect("message.receiver", "receiver")
				.where(`message.createdAt IN (${subQuery.getQuery()})`)
				.setParameters(subQuery.getParameters())
				.orderBy("message.createdAt", "DESC")
				.getMany();

			for (const message of messages) {
				if (message.senderId == id && message.receiver.avatarId) {
					const attachment = await this.attachmentService.getAttachmentById(message.receiver.avatarId);
					message.receiver.avatar = attachment;
				}
				else if (message.receiverId == id && message.sender.avatarId) {
					const attachment = await this.attachmentService.getAttachmentById(message.sender.avatarId);
					message.sender.avatar = attachment;
				}
			}
			return messages;
		}
		else {
			return this.messageRepo
				.createQueryBuilder("message")
				.where("(message.senderId = :id AND message.receiverId = :id2) OR (message.senderId = :id2 AND message.receiverId = :id)", { id, id2 })
				.leftJoinAndSelect("message.sender", "sender")
				.orderBy("message.createdAt", "ASC")
				.getMany();
		}
	}

	@Post("send/:id")
	sendMessage(@Param("id") id: string, @Query("to") to: string, @Body() body: Partial<Message>) {
		const message = this.messageRepo.create({
			...body,
			senderId: id,
			receiverId: to
		});
		return this.messageRepo.save(message);
	}
}