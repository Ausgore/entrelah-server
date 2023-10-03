import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateFaqsDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	gigId: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Faq)
	faqs: Faq[];
}

class Faq {
	@ApiProperty({ description: "This FAQ's question" })
	@IsNotEmpty()
	@IsString()
	question: string;

	@ApiProperty({ description: "This FAQ's answer" })
	@IsNotEmpty()
	@IsString()
	answer: string;
}