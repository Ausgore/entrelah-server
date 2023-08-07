import { Get, Post, Controller, Body, Query, Param, Delete, NotFoundException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { EntityPropertyNotFoundError, QueryFailedError } from "typeorm";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get(":id")
	getUserById(@Param("id") id: string) {
		return this.userService.getUserById(id).catch(e => e);
	}

	@Get()
	async getUsers(@Query() query) {
		const users = await this.userService.getUsers(query).catch(e => e);
		if (users instanceof EntityPropertyNotFoundError) throw new InternalServerErrorException(users.message);
		else return users as User[];
	}

	@Post("authenticate")
	async authenticate(@Body() body) {
		if (!body.identifier || !body.password) throw new InternalServerErrorException("You are expected to pass in an identifier or password");
		const user = await this.userService.getUserBy([{ email: body.identifier }, { username: body.identifier }]).catch(e => e);
		if (!user) throw new NotFoundException(`User cannot be found with identifier: ${body.identifier}`);
		else if (user instanceof User) {
			const isCorrectPassword = bcrypt.compareSync(body.password, user.password);
			if (!isCorrectPassword) throw new UnauthorizedException("Invalid password provided");
			return user;
		}
	}

	@Post("update/:id")
	async updateUser(@Param("id") id: string, @Body() data) {
		return this.userService.editUser(id, data);
	}

	@Post()
	async createUser(@Body() body: Partial<User>) {
		const saltKey = bcrypt.genSaltSync(10);
		body.saltKey = saltKey;
		body.password = bcrypt.hashSync(body.password, saltKey);

		const user = await this.userService.create(body).catch(e => e);
		if (user instanceof QueryFailedError) throw new InternalServerErrorException('Entity column is unique, but value provided is already taken');
		else return user as User;
	}

	@Delete(":id")
	async deleteUserById(@Param(":id") id: string) {
		const data = await this.userService.deleteUserById(id).catch(e => e);
		if (data instanceof QueryFailedError) throw new InternalServerErrorException(data.message);
		else return data;
	}
}
