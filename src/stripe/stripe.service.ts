import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
	private stripe: Stripe;
	constructor() {
		this.stripe = new Stripe("sk_test_51NnHKDLBQ2JqxfdO9AWFvR1J8IwPokQ9lhQ7Ngbkj8B23l6eYCHWJaztXUw47gQAHiZqz8AXriG2gjt9p6GJdKx9006dwBxhRS", { apiVersion: "2023-08-16" });
	}

	async retrievePaymentIntent(id: string) {
		return await this.stripe.paymentIntents.retrieve(id);
	}

	async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
		return await this.stripe.paymentIntents.create({ amount, currency });
	}

	async refundPaymentIntent(paymentIntentId: string) {
		return await this.stripe.refunds.create({ payment_intent: paymentIntentId })
	}
}