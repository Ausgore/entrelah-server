import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ReviewModule } from './review/review.module';
import { GigModule } from './gig/gig.module';
import { PackageModule } from './package/package.module';
import { FaqModule } from './faq/faq.module';
import { AttachmentModule } from './attachment/attachment.module';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe/stripe.service';
import { StripeController } from './stripe/stripe.controller';
import { OrderModule } from './order/order.module';
import { MessageModule } from "./message/message.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'development',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    AttachmentModule,
    CategoryModule,
    FaqModule,
    GigModule,
    MessageModule,
    PackageModule,
    OrderModule,
    ReviewModule,
    SubcategoryModule,
    UserModule,
  ],
  providers: [StripeService],
  controllers: [StripeController]
})
export class AppModule {}
