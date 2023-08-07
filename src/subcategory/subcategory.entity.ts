import { Category } from "src/category/category.entity";
import { Gig } from "src/gig/gig.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Subcategory {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@ManyToOne(() => Category, category => category.subcategories)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	@Column()
	categoryId: string;

	@OneToMany(() => Gig, gig => gig.subcategory)
	gigs: Gig[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}