import { Package } from "src/package/package.entity";
import { Review } from "src/review/review.entity";
import { Subcategory } from "src/subcategory/subcategory.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GigStatus } from "./typings/enums";

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

	@OneToMany(() => Package, p => p.gig, { cascade: true })
	packages: Package[];

	@ManyToOne(() => User, user => user.gigs)
	@JoinColumn({ name: "ownerId" })
	owner: User;

	@Column()
	ownerId: string;

	@OneToMany(() => Review, review => review.gig)
	reviews: Review[];
}