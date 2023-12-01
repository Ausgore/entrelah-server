import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {}

	create(data: Partial<Category>): Promise<Category> {
		const category = this.categoryRepo.create(data);
		return this.categoryRepo.save(category);
	}

	async createBulk(data: Partial<Category>[]): Promise<Category[]> {
		const categories = await this.categoryRepo.save(data).catch(() => null);
		if (!categories) throw new InternalServerErrorException("There is already an existing category that has the same name in the populated list.");
		return categories;
	}

	getCategories(where?: FindOptionsWhere<Category>): Promise<Category[]> {
		return this.categoryRepo.find({ where, relations: ["subcategories"] });
	}

	async getCategoryBy(where: FindOptionsWhere<Category> | FindOptionsWhere<Category>[]): Promise<Category> {
		const category = await this.categoryRepo.findOne({ where, relations: ["subcategories"] }).catch(() => null);
		if (!category) throw new NotFoundException("Category cannot be found with that ID");
		return category;
	}

	getCategoryById(id: string): Promise<Category> {
		return this.getCategoryBy({ id });
	}

	getCategoryByName(name: string): Promise<Category> {
		return this.getCategoryBy({ name });
	}
}