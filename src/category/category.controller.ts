import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get("name/:name") 
	getCategoryByName(@Param("name") name: string) {
		return this.categoryService.getCategoryBy({ name });
	}

	@Get(":id")
	getCategoryById(@Param("id") id: string) {
		return this.categoryService.getCategoryById(id);
	}

	@Get()
	getCategories(@Query() query) {
		return this.categoryService.getCategories(query);
	}

	@Post("populate")
	populateCategories() {
		const data = [
			{ name: "Graphics & Design" },
			{ name: "Digital Marketing" },
			{ name: "Writing & Translation" },
			{ name: "Video & Animation" },
			{ name: "Music & Audio" },
			{ name: "Programming & Tech" },
			{ name: "Photography" },
			{ name: "Business" },
			{ name: "AI Services" }
		]
		return this.categoryService.createBulk(data);
	}
}