import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReviewType } from "./typings/enums";
import { Gig } from "src/gig/gig.entity";

@Entity()
export class Review {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "enum", enum: ReviewType, default: ReviewType.Buyer })
	reviewType: ReviewType;

	@Column({ nullable: true })
	message: string;

	@Column({ nullable: true })
	buyerRating: number;

	@Column({ nullable: true })
	communicationRating: number;

	@Column({ nullable: true })
	recommendationRating: number;

	@Column({ nullable: true })
	accuracyRating: number;

	@ManyToOne(() => User, user => user.reviewsSent)
	@JoinColumn({ name: "reviewerId" })
	reviewer: User;

	@Column()
	reviewerId: string;
	
	@ManyToOne(() => User, user => user.reviewsReceived)
	@JoinColumn({ name: "revieweeId" })
	reviewee: User;

	@Column()
	revieweeId: string;

	@ManyToOne(() => Gig, gig => gig.reviews, { nullable: true, onDelete: "SET NULL" })
	gig: Gig;

	@Column({ nullable: true })
	gigId: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}