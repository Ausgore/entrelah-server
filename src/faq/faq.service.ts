import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Faq } from "./faq.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class FaqService {
	constructor(@InjectRepository(Faq) private faqRepo: Repository<Faq>) {}

	create(data: Partial<Faq>): Promise<Faq> {
		const faq = this.faqRepo.create(data);
		return this.faqRepo.save(faq);
	}

	getFaqs(where?: FindOptionsWhere<Faq>): Promise<Faq[]> {
		return this.faqRepo.find({ where });
	}

	async getFaqBy(where: FindOptionsWhere<Faq> | FindOptionsWhere<Faq>[]): Promise<Faq> {
		const faq = await this.faqRepo.findOne({ where }).catch(() => null);
		if (!faq) throw new NotFoundException("FAQ cannot be found with that ID");
		return faq;
	}

	getFaqById(id: string) {
		return this.getFaqBy({ id });
	}

	clearFaqs(criteria?: FindOptionsWhere<Faq>) {
		return this.faqRepo.delete(criteria ?? {});
	}

	deleteFaqById(id: string) {
		return this.faqRepo.delete({ id });
	}

	async updateFaqById(id: string, data: Partial<Faq>): Promise<Faq> {
		await this.faqRepo.update({ id }, data);
		return this.getFaqById(id);
	}
}