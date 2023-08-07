import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryDays } from "./typings/enums";
import { Gig } from "src/gig/gig.entity";

@Entity()
export class Package {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	revisions: number;

	@Column("decimal", { precision: 15, scale: 2 })
	price: number;

	@Column({ type: "enum", enum: DeliveryDays })
	deliveryDays: DeliveryDays;

	@ManyToOne(() => Gig, gig => gig.packages)
	@JoinColumn({ name: "gigId" })
	gig: Gig;

	@Column()
	gigId: string;
}