import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { StripeService } from "./stripe.service";
import Stripe from "stripe";

@Controller("stripe")
export class StripeController {
	constructor(private readonly stripeService: StripeService) {}

	@Get("get-payment-intent/:id")
	getPaymentIntent(@Param("id") id: string): Promise<Stripe.PaymentIntent> {
		return this.stripeService.retrievePaymentIntent(id);
	}

	@Post("create-payment-intent")
	async createPaymentIntent(@Body() body): Promise<Stripe.PaymentIntent> {
		return await this.stripeService.createPaymentIntent(body.amount, body.currency);
	}

	@Post("refund-payment-intent/:id")
	async refundPaymentIntent(@Param("id") id: string): Promise<Stripe.Refund> {
		return await this.stripeService.refundPaymentIntent(id);
	}
}