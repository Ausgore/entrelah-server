import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => User, u => u.messagesSent)
	@JoinColumn({ name: "senderId" })
	sender: User;

	@Column()
	senderId: string;

	@ManyToOne(() => User, u => u.messagesReceived)
	@JoinColumn({ name: "receiverId" })
	receiver: User;

	@Column()
	receiverId: string;

	@Column({ nullable: true })
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}