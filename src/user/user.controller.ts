import { Get, Post, Controller, Body, Query, HttpException, HttpStatus, Param, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException(`User cannot be found with ID: ${id}`);
    return user;
  }

  @Get()
  async getUsers(@Query() query) {
    const users = await this.userService.getUsers(query).catch(e => e);
    if (users instanceof EntityPropertyNotFoundError) throw new InternalServerErrorException(users.message);
    return users;
  }

  @Post()
  async createUser(@Body() body: Partial<User>) {
    const saltKey = bcrypt.genSaltSync(10);
    body.saltKey = saltKey;
    body.password = bcrypt.hashSync(body.password, saltKey);

    const user = await this.userService.create(body).catch(e => e);
    if (user instanceof QueryFailedError) throw new InternalServerErrorException('Entity column is unique, but value provided is already taken');
    return user;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    const data = await this.userService.deleteUserById(id).catch(e => e);
    if (data instanceof QueryFailedError) throw new InternalServerErrorException(data.message);
    return data;
  }
}
