import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../order.entity";
import { OrderEventType } from "../typings/enums";

@Entity()
export class OrderEventEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Order, o => o.events)
	@JoinColumn({ name: "orderId" })
	order: Order;

	@Column()
	orderId: string;

	@Column({ type: "enum", enum: OrderEventType })
	type: OrderEventType;

	@Column({ type: "json", nullable: true })
	metadata: Record<string, any>;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}