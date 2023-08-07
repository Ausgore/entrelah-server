import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subcategory } from "./subcategory.entity";
import { SubcategoryService } from "./subcategory.service";
import { SubcategoryController } from "./subcategory.controller";
import { CategoryService } from "src/category/category.service";
import { CategoryModule } from "src/category/category.module";

@Module({
	imports: [TypeOrmModule.forFeature([Subcategory]), CategoryModule],
	controllers: [SubcategoryController],
	providers: [SubcategoryService, CategoryService],
	exports: [TypeOrmModule]
})
export class SubcategoryModule {};