import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateGigDto {
	@ApiProperty({ description: "The title for this gig" })
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({ description: "The subcategory this gig is in" })
	@IsNotEmpty()
	@IsString()
	subcategoryId: string;

	@ApiProperty({ description: "The owner of this gig" })
	@IsNotEmpty()
	@IsString()
	ownerId: string;
}