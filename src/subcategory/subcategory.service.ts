import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Subcategory } from './subcategory.entity';
import { FindOptionsWhere, Repository } from "typeorm";
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class SubcategoryService {
	constructor(
		@InjectRepository(Subcategory) private subcategoryRepo: Repository<Subcategory>,
		private readonly categoryService: CategoryService) { }

	async create(data: Partial<Subcategory>): Promise<Subcategory> {
		const subcategory = this.subcategoryRepo.create(data);
		const result = await this.subcategoryRepo.save(subcategory).catch(() => null);
		if (!result) throw new InternalServerErrorException("There is already a subcategory with that name");
		return result;
	}

	async createBulk(data: Partial<Subcategory>[]): Promise<Subcategory[]> {
		const subcategories = await this.subcategoryRepo.save(data).catch(() => null);
		if (!subcategories) throw new InternalServerErrorException("There is already an existing subcategory that has the same name in the populated list");
		return subcategories;
	}

	getSubcategories(where?: FindOptionsWhere<Subcategory>): Promise<Subcategory[]> {
		return this.subcategoryRepo.find({ where, relations: ["category"] });
	}

	async getSubcategoryBy(where: FindOptionsWhere<Subcategory> | FindOptionsWhere<Subcategory>[]): Promise<Subcategory> {
		const subcategory = await this.subcategoryRepo.findOne({ where }).catch(() => null);
		if (!subcategory) throw new NotFoundException("Subcategory cannot be found");
		return subcategory;
	}

	getSubcategoryById(id: string): Promise<Subcategory> {
		return this.getSubcategoryBy({ id });
	}

	deleteSubcategoryById(id: string) {
		return this.subcategoryRepo.delete({ id });
	}

	clearSubcategories() {
		return this.subcategoryRepo.clear();
	}

	async getSubcategoriesUnder(categoryName: string): Promise<Subcategory[]> {
		const category = await this.categoryService.getCategoryByName(categoryName);
		return this.getSubcategories({ categoryId: category.id });
	}
}