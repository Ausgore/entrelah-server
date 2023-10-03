import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { GigStatus } from "../typings/enums";

export class EditGigDto {
	@ApiProperty({ description: "The title for this gig" })
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty({ description: "The subcategory this gig is in" })
	@IsString()
	@IsOptional()
	subcategoryId: string;

	@ApiProperty({ description: "Whether this gig has multiple packages" })
	@IsOptional()
	@IsBoolean()
	multipackages: boolean;

	@ApiProperty({ description: "The gig's description" })
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({ description: "The gig's status" })
	@IsOptional()
	@IsEnum(GigStatus)
	status: GigStatus;
}