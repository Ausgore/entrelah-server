import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateAttachmentDto {
	@ApiProperty({ description: "The filename of this attachment" })
	@IsNotEmpty()
	@IsString()
	filename: string;
	
	@ApiProperty({ description: "The filesize of this attachment" })
	@IsNotEmpty()
	@IsNumber()
	filesize: number;

	@ApiProperty({ description: "The content type of this attachment" })
	@IsNotEmpty()
	@IsString()
	contentType: string;

	@ApiProperty({ description: "The base64 data of this attachment" })
	@IsNotEmpty()
	@IsString()
	base64Data: string;
}