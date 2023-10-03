import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OrderService } from "./order.service";
import { Order } from './order.entity';
@Controller("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) { };

	@Get()
	findOrders() {
		return this.orderService.findOrders();
	}

	@Get("seller/:id")
	findOrdersBelongingToUser(@Param("id") id: string) {
		return this.orderService.findOrders({ package: { gig: { owner: { id } } } });
	}

	@Get(":id")
	findOrderById(@Param("id") id: string): Promise<Order> {
		return this.orderService.findOrderById(id);
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