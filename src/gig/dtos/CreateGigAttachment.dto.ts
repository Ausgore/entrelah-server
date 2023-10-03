import { IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { GigAttachmentType } from "../typings/enums";
import { Type } from "class-transformer";
import { CreateAttachmentDto } from "src/attachment/dtos/CreateAttachment.dto";

export class CreateGigAttachmentDto {
	@IsEnum(GigAttachmentType)
	@IsNotEmpty()
	type: GigAttachmentType;

	@ValidateNested({ each: true })
	@Type(() => CreateAttachmentDto)
	attachment: CreateAttachmentDto;
}