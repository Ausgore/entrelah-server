import { Controller, Param, Get, Query, Post, Body, Delete } from '@nestjs/common';
import { GigService } from "./gig.service";
import { CreateGigDto } from './dtos/CreateGig.dto';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { UserService } from 'src/user/user.service';

@Controller("gig")
export class GigController {
	constructor(
		private readonly gigService: GigService,
		private readonly subcategoryService: SubcategoryService,
		private readonly userService: UserService) {}

	@Post("create")
	async createGig(@Body() body: CreateGigDto) {
		await this.subcategoryService.getSubcategoryById(body.subcategoryId);
		await this.userService.getUserById(body.ownerId);
		return this.gigService.create(body);
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
}