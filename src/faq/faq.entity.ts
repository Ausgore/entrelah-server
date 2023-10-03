import { Gig } from "src/gig/gig.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Faq {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	question: string;

	@Column()
	answer: string;
	
	@ManyToOne(() => Gig, gig => gig.faqs)
	@JoinColumn({ name: "gigId" })
	gig: Gig;

	@Column()
	gigId: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}