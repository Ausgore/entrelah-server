import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from "./order.service";
import { Order } from './order.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEvent } from "./entities/orderEvent.entity";
import { Repository } from "typeorm";
import { OrderEventType, OrderStatus } from "./typings/enums";
@Controller("order")
export class OrderController {
	constructor(
		@InjectRepository(OrderEvent) private orderEventRepo: Repository<OrderEvent>,
		private readonly orderService: OrderService) { };

	@Get()
	findOrders(@Query() where) {
		return this.orderService.findOrders(where);
	}

	@Get("seller/:id")
	findOrdersBelongingToUser(@Param("id") id: string) {
		return this.orderService.findOrders({ package: { gig: { owner: { id } } } });
	}

	@Get(":id")
	findOrderById(@Param("id") id: string): Promise<Order> {
		return this.orderService.findOrderById(id);
	}

	@Post("update/:id")
	updateOrderById(@Param("id") id: string, @Body() body) {
		return this.orderService.updateOrder(id, body);
	}

	@Post("eventmessage/:id")
	sendOrderMessage(@Param("id") id: string, @Body() body) {
		const event = this.orderEventRepo.create({ orderId: id, type: OrderEventType.Message, metadata: body });
		return this.orderEventRepo.save(event);
	}

	@Post("eventdeliver/:id")
	sendOrderDelivery(@Param("id") id: string, @Body() body) {
		const event = this.orderEventRepo.create({ orderId: id, type: OrderEventType.Delivered, metadata: body });
		return this.orderEventRepo.save(event);
	}

	@Post("events/buyer_review/:id")
	sendBuyerReview(@Param("id") id: string, @Body() body) {
		const event = this.orderEventRepo.create({ orderId: id, type: OrderEventType.BuyerReviewed, metadata: body });
		return this.orderEventRepo.save(event);
	}

	@Post("complete/:id")
	async completeOrder(@Param("id") id: string) {
		await this.updateOrderById(id, { status: 2 });
		const event = this.orderEventRepo.create({ orderId: id, type: OrderEventType.Completed });
		await this.orderEventRepo.save(event);
		return this.findOrderById(id);
	}

	@Post()
	createOrder(@Body() body): Promise<Order> {
		return this.orderService.createOrder(body);
	}

	@Delete(":id")
	deleteOrderById(@Param("id") id: string) {
		return this.orderService.deleteOrderById(id);
	}
}