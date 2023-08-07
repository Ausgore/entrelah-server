import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gig } from "./gig.entity";
import { SubcategoryModule } from "src/subcategory/subcategory.module";
import { GigService } from "./gig.service";
import { GigController } from "./gig.controller";
import { PackageModule } from "src/package/package.module";
import { PackageService } from "src/package/package.service";
import { SubcategoryService } from "src/subcategory/subcategory.service";
import { CategoryModule } from "src/category/category.module";
import { CategoryService } from "src/category/category.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

@Module({
	imports: [TypeOrmModule.forFeature([Gig]), PackageModule, SubcategoryModule, CategoryModule, UserModule],
	controllers: [GigController],
	providers: [GigService, PackageService, SubcategoryService, CategoryService, UserService],
	exports: [TypeOrmModule]
})
export class GigModule {};