import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

import { User } from '../database/entities';

import { UserService } from './user.service';

import { SetAddressDto, UpdateRoleDto } from './dto';

import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../auth/enums/role.enum';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Roles(RoleEnum.ADMIN)
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') userId: string): Promise<User> {
    const options: FindOneOptions = {
      where: { id: userId },
    };
    return this.userService.getUser(options);
  }

  @Post('/address/:id')
  setAddress(
    @Param('id') userId: string,
    @Body() addressDto: SetAddressDto,
  ): Promise<User> {
    return this.userService.setAddress(userId, addressDto);
  }

  @Patch('/roles/:id')
  @UseGuards(RoleGuard)
  @Roles(RoleEnum.ADMIN)
  changeRole(
    @Param('id') userId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.userService.changeRole(userId, updateRoleDto);
  }
}
