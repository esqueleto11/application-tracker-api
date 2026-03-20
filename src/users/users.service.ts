import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  findOne(id: string): UserResponse {
    const user = this.users.find((x) => x.id === id);

    if (!user) {
      const error = new Error('User not found!');
      throw error;
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    };
  }

  findAll(): UserResponse[] {
    return this.users.map((x) => ({
      id: x.id,
      firstName: x.firstName,
      lastName: x.lastName,
      username: x.username,
      email: x.email,
    }));
  }

  create(createUserDto: CreateUserDTO): UserResponse {
    const newUser: UserEntity = {
      id: crypto.randomUUID(),
      passwordHash: 'todo',
      ...createUserDto,
    };
    this.users.push(newUser);

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto): UserResponse {
    const idx = this.users.findIndex((x) => x.id === id);

    if (idx === -1) {
      const error = new Error('User to update not found!');
      throw error;
    }

    this.users[idx] = {
      ...this.users[idx],
      ...updateUserDto,
    };

    return {
      id: this.users[idx].id,
      firstName: this.users[idx].firstName,
      lastName: this.users[idx].lastName,
      username: this.users[idx].username,
      email: this.users[idx].email,
    };
  }

  delete(id: string) {
    const idx = this.users.findIndex((x) => x.id === id);

    if (idx === -1) {
      const error = new Error('User to delete does not exist!');
      throw error;
    }

    this.users.splice(idx, 1);
  }
}
