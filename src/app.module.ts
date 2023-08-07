import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ReviewModule } from './review/review.module';
import { GigModule } from './gig/gig.module';
import { PackageModule } from './package/package.module';

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
    CategoryModule,
    GigModule,
    PackageModule,
    ReviewModule,
    SubcategoryModule,
    UserModule,
  ],
})
export class AppModule {}
