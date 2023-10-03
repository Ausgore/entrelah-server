import { Package } from "src/package/package.entity";
import { Review } from "src/review/review.entity";
import { Subcategory } from "src/subcategory/subcategory.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GigStatus } from "./typings/enums";
import { Faq } from "src/faq/faq.entity";
import { GigAttachment } from "./entities/gigAttachment.entity";

@Entity()
export class Gig {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column({ type: "enum", enum: GigStatus, default: GigStatus.Drafted })
	status: GigStatus;

	@ManyToOne(() => Subcategory, subcategory => subcategory.gigs)
	@JoinColumn({ name: "subcategoryId" })
	subcategory: Subcategory;

	@Column()
	subcategoryId: string;

	@Column({ default: true })
	multipackages: boolean;

	@OneToMany(() => Faq, f => f.gig, { cascade: true })
	faqs: Faq[];

	@OneToMany(() => Package, p => p.gig, { cascade: true })
	packages: Package[];

	@OneToMany(() => GigAttachment, g => g.gig, { cascade: true })
	attachments: GigAttachment[];

	@ManyToOne(() => User, user => user.gigs)
	@JoinColumn({ name: "ownerId" })
	owner: User;

	@Column()
	ownerId: string;

	@OneToMany(() => Review, review => review.gig)
	reviews: Review[];

	@ManyToMany(() => User, user => user.savedGigs, { onDelete: "CASCADE" })
	usersWhoSaved: User[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}