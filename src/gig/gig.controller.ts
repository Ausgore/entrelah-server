import { Controller, Param, Get, Query, Post, Body, Delete } from '@nestjs/common';
import { GigService } from "./gig.service";
import { CreateGigDto } from './dtos/CreateGig.dto';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { UserService } from 'src/user/user.service';
import { EditGigDto } from './dtos/EditGig.dto';
import { PackageService } from 'src/package/package.service';
import { CreateGigAttachmentDto } from './dtos/CreateGigAttachment.dto';

@Controller("gig")
export class GigController {
	constructor(
		private readonly gigService: GigService,
		private readonly packageService: PackageService,
		private readonly subcategoryService: SubcategoryService,
		private readonly userService: UserService) {}
	

	@Post("create")
	async createGig(@Body() body: CreateGigDto) {
		await this.subcategoryService.getSubcategoryById(body.subcategoryId);
		await this.userService.getUserById(body.ownerId);
		return this.gigService.createGig({ ...body, multipackages: true });
	}

	@Post("edit/:id")
	editGig(@Param("id") id: string, @Body() body: EditGigDto) {
		return this.gigService.editGigById(id, body);
	}

	@Post(":id/attachment/create")
	createGigAttachment(@Param("id") gigId: string, @Body() body: CreateGigAttachmentDto) {
		return this.gigService.createGigAttachment(gigId, body);
	}

	@Delete("attachments/:id")
	deleteGigAttachment(@Param("id") id: string) {
		return this.gigService.deleteGigAttachmentById(id);
	}

	@Get(":id/attachments")
	async getGigAttachments(@Param("id") id: string, @Query() query) {
		if (query.first == "true") return await this.gigService.getFirstGigAttachment(id);
		else {
			const attachments = await this.gigService.getGigAttachments(id);
			return attachments.sort((a, b) => {
				if (a.type !== b.type) return a.type - b.type;
				else return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
			});
		}
	}
	
	@Get(":id")
	getGigById(@Param("id") id: string) {
		return this.gigService.getGigById(id);
	}

	@Get()
	getGigs(@Query() query) {
		return this.gigService.getGigs(query);
	}

	@Delete("delete/:id")
	deleteGigById(@Param("id") id: string) {
		return this.gigService.deleteGigById(id);
	}

	@Delete("clear")
	async clearGigs() {
		await this.packageService.clearPackages();
		await this.gigService.clearGigs();
		return { message: "All gigs have been deleted" };
	}
}
