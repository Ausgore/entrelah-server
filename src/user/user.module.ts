import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { GigService } from 'src/gig/gig.service';
import { PackageService } from 'src/package/package.service';
import { Gig } from 'src/gig/gig.entity';
import { Package } from 'src/package/package.entity';
import { GigAttachment } from 'src/gig/entities/gigAttachment.entity';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gig, Package, GigAttachment, Attachment])],
  controllers: [UserController],
  providers: [UserService, GigService, PackageService, AttachmentService, ConfigService],
  exports: [TypeOrmModule],
})
export class UserModule {};
