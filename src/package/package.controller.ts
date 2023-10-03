import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { PackageService } from "./package.service";
import { CreatePackagesDto } from "./dtos/CreatePackage.dto";
import { GigService } from "src/gig/gig.service";

@Controller("package")
export class PackageController {
	constructor(
		private readonly packageService: PackageService
	) { }

	@Get(":id")
	getPackageById(@Param("id") id: string) {
		return this.packageService.getPackageById(id);
	}

	@Get()
	getPackages(@Query() query) {
		return this.packageService.getPackages(query);
	}

	@Post("create")
	async createPackage(@Body() body: CreatePackagesDto) {
		return await Promise.all(body.packages.map(pkg => this.packageService.create({ ...pkg, gigId: body.gigId })));
	}

	@Post("update/:id")
	async updatePackage(@Param("id") id: string, @Body() body) {
		return this.packageService.updatePackageById(id, body);
	}

	@Delete("clear")
	clearPackages() {
		this.packageService.clearPackages();
		return { message: "All packages have been deleted" };
	}

	@Delete("delete/:id")
	deletePackage(@Param("id") id: string) {
		return this.packageService.deletePackageById(id);
	}
}