import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditGigDto {
	@ApiProperty({ description: "The title for this gig" })
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty({ description: "The subcategory this gig is in" })
	@IsString()
	@IsOptional()
	subcategoryId: string;
}