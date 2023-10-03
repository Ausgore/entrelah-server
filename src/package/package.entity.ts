import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryDays } from "./typings/enums";
import { Gig } from "src/gig/gig.entity";
import { Order } from "src/order/order.entity";

@Entity()
export class Package {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ nullable: true })
	revisions: number;

	@Column("decimal", { precision: 15, scale: 2 })
	price: number;

	@Column({ type: "enum", enum: DeliveryDays })
	deliveryDays: DeliveryDays;

	@Column()
	index: number;

	@ManyToOne(() => Gig, gig => gig.packages)
	@JoinColumn({ name: "gigId" })
	gig: Gig;

	@OneToMany(() => Order, order => order.package)
	orders: Order[];

	@Column()
	gigId: string;
}