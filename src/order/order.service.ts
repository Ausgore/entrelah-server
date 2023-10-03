import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderStatus } from './typings/enums';
import { UserService } from 'src/user/user.service';
import { PackageService } from 'src/package/package.service';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order) private orderRepo: Repository<Order>,
		private readonly userService: UserService) {}

	async createOrder(data: Partial<Order>): Promise<Order> {
		await this.userService.getUserById(data.customerId);
		const order = this.orderRepo.create(data);
		return this.orderRepo.save(order);
	}

	async findOrders(where?: FindOptionsWhere<Order>) {
		return this.orderRepo.find({ where, relations: ["package", "package.gig", "customer"] });
	}

	async findOrderBy(where?: FindOptionsWhere<Order>) {
		const order = await this.orderRepo.findOne({ where, relations: ["package", "package.gig", "customer", "events"] }).catch(() => null);
		if (!order) throw new NotFoundException("Order cannot be found with that ID");
		return order;
	}

	findOrderById(id: string) {
		return this.findOrderBy({ id });
	}

	async updateOrder(id: string, data: Partial<Order>) {
		await this.findOrderById(id);
		return this.orderRepo.update({ id }, data);
	}

	private async updateOrderStatus(id: string, status: OrderStatus) {
		return this.updateOrder(id, { status: status })
	}

	setOrderCompleted(id: string) {
		return this.updateOrderStatus(id, OrderStatus.Completed);
	}

	setOrderCancelled(id: string) {
		return this.updateOrderStatus(id, OrderStatus.Cancelled);
	}

	deleteOrderById(id: string) {
		return this.orderRepo.delete({ id });
	}
}