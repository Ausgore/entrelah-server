import { GigAttachment } from "src/gig/entities/gigAttachment.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Attachment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	filename: string;

	@Column()
	extension: string;

	@Column()
	filesize: number;

	@Column()
	contentType: string;

	@Column("bytea", { nullable: true })
	data: Buffer;

	@OneToOne(() => User, u => u.avatar)
	user: User;

	@OneToOne(() => GigAttachment, g => g.attachment)
	gigAttachment: GigAttachment;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}