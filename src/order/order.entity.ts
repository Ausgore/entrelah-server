import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "./typings/enums";
import { Package } from "src/package/package.entity";
import { DeliveryDays } from "src/package/typings/enums";
import { OrderEvent } from "./entities/orderEvent.entity";
import { Review } from "src/review/review.entity";

@Entity()
export class Order {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	paymentIntentId: string;

	@ManyToOne(() => User, u => u.orders)
	@JoinColumn({ name: "customerId" })
	customer: User;

	@Column()
	customerId: string;

	@Column()
	quantity: number;

	@Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Active })
	status: OrderStatus;

	@ManyToOne(() => Package, p => p.orders)
	@JoinColumn({ name: "packageId" })
	package: Package;

	@Column()
	packageId: string;

	@Column({ nullable: true })
	title: string;

	@Column()
	description: string;

	@Column("decimal", { precision: 15, scale: 2 })
	price: number;

	@Column({ type: "enum", enum: DeliveryDays })
	deliveryDays: DeliveryDays;

	@Column({ nullable: true })
	revisions: number;

	@Column({ nullable: true })
	deliveredAt: Date;

	@OneToMany(() => OrderEvent, oe => oe.order)
	events: OrderEvent[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}