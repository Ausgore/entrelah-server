import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gig } from "./gig.entity";
import { GigService } from "./gig.service";
import { GigController } from "./gig.controller";
import { PackageService } from "src/package/package.service";
import { SubcategoryService } from "src/subcategory/subcategory.service";
import { CategoryService } from "src/category/category.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { Package } from 'src/package/package.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { Category } from 'src/category/category.entity';
import { Review } from 'src/review/review.entity';
import { Faq } from 'src/faq/faq.entity';
import { GigAttachment } from './entities/gigAttachment.entity';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [TypeOrmModule.forFeature([Gig, Package, Subcategory, Category, Review, Faq, GigAttachment, Attachment]), forwardRef(() => UserModule)],
	controllers: [GigController],
	providers: [GigService, PackageService, SubcategoryService, CategoryService, UserService, AttachmentService, ConfigService],
	exports: [TypeOrmModule]
})
export class GigModule {};