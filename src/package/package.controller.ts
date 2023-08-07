import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { PackageService } from "./package.service";
import { CreatePackageDto } from "./dtos/CreatePackage.dto";
import { GigService } from "src/gig/gig.service";

@Controller("package")
export class PackageController {
	constructor(
		private readonly packageService: PackageService,
		private readonly gigService: GigService
	) {}

	@Get(":id")
	getPackageById(@Param("id") id: string) {
		return this.packageService.getPackageById(id);
	}

	@Get()
	getPackages(@Query() query) {
		return this.packageService.getPackages(query);
	}

	@Post("create")
	async createPackage(@Body() body: CreatePackageDto) {
		await this.gigService.getGigById(body.gigId);
		return this.packageService.create(body);
	}

	@Delete("clear")
	clearPackages() {
		this.packageService.clearPackages();
		return { message: "All packages have been deleted" };
	}
}