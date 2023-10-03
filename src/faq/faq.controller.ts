import { Controller, Param, Get, Query, Post, Body, Delete } from '@nestjs/common';
import { FaqService } from "./faq.service";
import { CreateFaqsDto } from './dtos/CreateFaqsDto';

@Controller("faq")
export class FaqController {
	constructor(private readonly faqService: FaqService) {}

	@Get(":id")
	getFaqById(@Param("id") id: string) {
		return this.faqService.getFaqById(id);
	}

	@Get()
	getFaqs(@Query() query) {
		return this.faqService.getFaqs(query);
	}

	@Post("create")
	async createFaq(@Body() body: CreateFaqsDto) {
		return await Promise.all(body.faqs.map(faq => this.faqService.create({ ...faq, gigId: body.gigId })));
	}

	@Post("update/:id")
	async updateFaq(@Param("id") id: string, @Body() body) {
		return this.faqService.updateFaqById(id, body);
	}

	@Delete("clear")
	clearFaqs() {
		this.faqService.clearFaqs();
		return { message: "All FAQs have been deleted" };
	}

	@Delete("delete/:id")
	deleteFaqs(@Param("id") id: string) {
		return this.faqService.deleteFaqById(id);
	}
}