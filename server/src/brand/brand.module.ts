import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from '../database/entities';
import { UserModule } from '../user/user.module';

import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), UserModule],
  providers: [BrandService],
  controllers: [BrandController],
  exports: [BrandService],
})
export class BrandModule {}
