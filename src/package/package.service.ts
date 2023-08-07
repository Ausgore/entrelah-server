import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PackageService {
	constructor(@InjectRepository(Package) private packageRepo: Repository<Package>) {}

	create(data: Partial<Package>): Promise<Package> {
		const pkg = this.packageRepo.create(data);
		return this.packageRepo.save(pkg);
	}

	getPackages(where?: FindOptionsWhere<Package>): Promise<Package[]> {
		return this.packageRepo.find({ where, relations: ["gig"] });
	}

	async getPackagesBy(where: FindOptionsWhere<Package> | FindOptionsWhere<Package>[]): Promise<Package> {
		const pkg = await this.packageRepo.findOne({ where, relations: ["gig"] }).catch(() => null);
		if (!pkg) throw new NotFoundException("Package cannot be found with that ID");
		return pkg;
	}

	getPackageById(id: string) {
		return this.getPackagesBy({ id });
	}

	clearPackages(criteria?: FindOptionsWhere<Package>) {
		return this.packageRepo.delete(criteria ?? {});
	}
}