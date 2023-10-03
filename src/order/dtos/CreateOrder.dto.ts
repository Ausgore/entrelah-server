import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { DeliveryDays } from "src/package/typings/enums";

export class CreateOrderDto {
	@ApiProperty({ description: "The customer's ID who ordered" })
	@IsString()
	@IsNotEmpty()
	customerId: string;

	@ApiProperty({ description: "The package ID this order belongs to" })
	@IsString()
	@IsNotEmpty()
	packageId: string;

	@ApiProperty({ description: "The quantity of the package ordered" })
	@IsInt()
	@IsNotEmpty()
	quantity: number;

	@ApiProperty({ description: "The title of the package" })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: "The description of the package" })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: "The number of revisions this package provides" })
	@IsOptional()
	@IsInt()
	@Min(-1)
	@Max(9)
	revisions: number;

	@ApiProperty({ description: "The expected number of days this package should be delivered by", enum: DeliveryDays })
	@IsNotEmpty()
	@IsEnum(DeliveryDays)
	deliveryDays: DeliveryDays;

	@ApiProperty({ description: "The payment intent ID associated with this order" })
	@IsString()
	@IsNotEmpty()
	paymentIntentId: string;

	@ApiProperty({ description: "This package's pricing" })
	@IsNotEmpty()
	@IsNumber()
	@Min(5)
	@Max(10000)
	price: number;
}