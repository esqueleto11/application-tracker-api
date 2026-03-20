import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';

describe('UsersService', () => {
  const userOneDto: CreateUserDTO = {
    email: 'test@gmail.com',
    firstName: 'Zach',
    lastName: 'Merris',
    username: 'zcmerris',
    password: 'p@$$w0rd',
  };
  let userOneResponse: UserResponse;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    userOneResponse = service.create(userOneDto);
  });

  afterEach(() => {
    service.delete(userOneResponse.id);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should throw an error if no user is found', () => {
      expect(() => service.findOne('test')).toThrow(/not found/);
    });

    it('should return the created user on success', () => {
      const foundUser = service.findOne(userOneResponse.id);

      expect(foundUser).toEqual(userOneResponse);
    });
  });

  describe('findAll', () => {
    const userTwoDto: CreateUserDTO = {
      email: 'anotha1@test.com',
      firstName: 'John',
      lastName: 'Bender',
      username: 'jbender',
      password: 'smokeUpJohnny84!',
    };
    let userTwo: UserResponse;

    beforeEach(() => {
      userTwo = service.create(userTwoDto);
    });
    afterEach(() => {
      service.delete(userTwo.id);
    });

    it('shoudld return all users', () => {
      const allUsers = service.findAll();

      expect(allUsers).toEqual([userOneResponse, userTwo]);
    });
  });

  describe('update', () => {
    it('should allow for updates to first name, last name, and username', () => {
      const updateData: UpdateUserDto = {
        firstName: 'Jack',
        lastName: 'Ferris',
        username: 'jferris',
      };

      service.update(userOneResponse.id, updateData);

      expect(service.findOne(userOneResponse.id)).toEqual({
        ...userOneResponse,
        ...updateData,
      });
    });
  });
});
