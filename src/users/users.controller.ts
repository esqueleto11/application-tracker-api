import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import type { CreateUserDTO } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import type { UserResponse } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers(): UserResponse[] {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO): UserResponse {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findUser(@Param('id') id: string): UserResponse {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): UserResponse {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.usersService.delete(id);

    return `Successfully deleted user with id: ${id}`;
  }
}
