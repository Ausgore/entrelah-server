import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubcategoryDto {
	@ApiProperty({ description: "The name of the subcategory" })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ description: "The ID of the parent category for this subcategory" })
	@IsNotEmpty()
	@IsString()
	categoryId: string;
}