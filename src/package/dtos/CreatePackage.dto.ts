import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { DeliveryDays } from "../typings/enums";
import { Type } from "class-transformer";

export class CreatePackagesDto {
	@ApiProperty({ description: "The gig's ID this package will be under" })
	@IsNotEmpty()
	@IsString()
	gigId: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Package)
	packages: Package[];
}
class Package {
	@ApiProperty({ description: "The title for this package" })
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({ description: "The description for this package" })
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({ description: "The number of revisions this package provides" })
	@IsOptional()
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

	@ApiProperty({ description: "The index of this package" })
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(2)
	index: number;
}