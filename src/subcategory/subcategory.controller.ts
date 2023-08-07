import { Body, Controller, Get, Param, Query, Post, Delete } from '@nestjs/common';
import { SubcategoryService } from "./subcategory.service";
import { CreateSubcategoryDto } from './dtos/createSubcategory.dto';
import { CategoryService } from 'src/category/category.service';
import { Subcategory } from './subcategory.entity';

@Controller("subcategory")
export class SubcategoryController {
	constructor(
		private readonly subcategoryService: SubcategoryService,
		private readonly categoryService: CategoryService
	) { }

	@Get(":id")
	getSubcategoryById(@Param("id") id: string) {
		return this.subcategoryService.getSubcategoryById(id);
	}

	@Get()
	getSubcategories(@Query("category") category?: string) {
		if (category) return this.subcategoryService.getSubcategoriesUnder(category);
		else return this.subcategoryService.getSubcategories();
	}

	@Post("create")
	async createSubcategory(@Body() body: CreateSubcategoryDto) {
		const data: Partial<Subcategory> = { name: body.name };
		
		const category = await this.categoryService.getCategoryById(body.categoryId);
		data.categoryId = category.id;

		return this.subcategoryService.create(data);
	}

	@Post("populate")
	async bulkCreateSubcategories() {
		const data = [];
		const categories = await this.categoryService.getCategories();
		let i = 0;
		for (const category of categories) {
			let x = 0;
			while (x < 4) {
				data.push({ name: `Subcategory ${i + 1}`, categoryId: category.id });
				i++;
				x++;
			}
		}
		return this.subcategoryService.createBulk(data);
	}

	@Delete("clear")
	clearSubcategories() {
		this.subcategoryService.clearSubcategories();
		return { message: "All subcategories have been deleted" };
	}
		

	@Delete("delete/:id")
	deleteSubcategoryById(@Param("id") id: string) {
		return this.subcategoryService.deleteSubcategoryById(id);
	}

}