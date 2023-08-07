import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gig } from 'src/gig/gig.entity';
import { PackageService } from 'src/package/package.service';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class GigService {
	constructor(
		@InjectRepository(Gig) private gigRepo: Repository<Gig>,
		private packageService: PackageService) {}

	create(data: Partial<Gig>): Promise<Gig> {
		const gig = this.gigRepo.create(data);
		return this.gigRepo.save(gig);
	}

	getGigs(where?: FindOptionsWhere<Gig>): Promise<Gig[]> {
		return this.gigRepo.find({ where, relations: ["subcategory", "packages", "owner", "reviews"] });
	}

	async getGigBy(where: FindOptionsWhere<Gig> | FindOptionsWhere<Gig>[]): Promise<Gig> {
		const gig = await this.gigRepo.findOne({ where, relations: ["subcategory", "packages", "owner", "reviews"] }).catch(() => null);
		if (!gig) throw new NotFoundException("Gig cannot be found with that ID");
		return gig;
	}

	getGigById(id: string) {
		return this.getGigBy({ id });
	}

	async deleteGigById(id: string) {
		await this.packageService.clearPackages({ gigId: id });
		this.gigRepo.delete({ id });
		return { message: "Successfully deleted this gig and all packages associated with it"}
	}
}