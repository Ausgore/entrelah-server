import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Package } from "./package.entity";
import { PackageService } from "./package.service";
import { PackageController } from "./package.controller";
import { GigModule } from "src/gig/gig.module";
import { GigService } from "src/gig/gig.service";

@Module({
	imports: [TypeOrmModule.forFeature([Package]), forwardRef(() => GigModule)],
	providers: [PackageService, GigService],
	controllers: [PackageController],
	exports: [TypeOrmModule]
})
export class PackageModule {};