import { Attachment } from "src/attachment/attachment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GigAttachmentType } from "../typings/enums";
import { Gig } from "../gig.entity";

@Entity()
export class GigAttachment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	type: GigAttachmentType;
	
	@OneToOne(() => Attachment, a => a.gigAttachment)
	@JoinColumn({ name: "attachmentId" })
	attachment: Attachment;

	@Column()
	attachmentId: string;

	@ManyToOne(() => Gig, g => g.attachments)
	@JoinColumn({ name: "gigId" })
	gig: Gig;

	@Column()
	gigId: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}