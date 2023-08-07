import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { DeliveryDays } from "../typings/enums";

export class CreatePackageDto {
	@ApiProperty({ description: "The title for this package" })
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({ description: "The description for this package" })
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({ description: "The number of revisions this package provides" })
	@IsNotEmpty()
	@IsInt()
	@Min(-1)
	@Max(9)
	revisions: number;

	@ApiProperty({ description: "This package's pricing" })
	@IsNotEmpty()
	@IsNumber()
	@Min(5)
	@Max(10000)
	price: number;

	@ApiProperty({ description: "The expected number of days this package should be delivered by", enum: DeliveryDays })
	@IsNotEmpty()
	@IsEnum(DeliveryDays)
	deliveryDays: DeliveryDays;

	@ApiProperty({ description: "The gig's ID this package will be under" })
	@IsNotEmpty()
	@IsString()
	gigId: string;
}