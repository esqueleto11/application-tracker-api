import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserResponse } from './dto/user-response.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const MOCK_USER_RESPONSE: UserResponse = {
    email: 'zcmerris@fake.com',
    firstName: 'Zach',
    lastName: 'Merris',
    username: 'zcmerris',
    id: 'a1b2c3',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllUsers', () => {
    const mockFindAllResponse = [MOCK_USER_RESPONSE];
    let findAllUsersServiceSpy: jest.SpyInstance;

    beforeEach(() => {
      findAllUsersServiceSpy = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => mockFindAllResponse);
    });

    afterEach(() => {
      findAllUsersServiceSpy.mockReset();
    });

    it('should call usersService findAll method and return all users', () => {
      const users = controller.findAllUsers();

      expect(findAllUsersServiceSpy).toHaveBeenCalledTimes(1);
      expect(users).toEqual(mockFindAllResponse);
    });
  });

  describe('createUser', () => {
    let createUserServiceSpy: jest.SpyInstance;

    beforeEach(() => {
      createUserServiceSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => MOCK_USER_RESPONSE);
    });

    afterEach(() => {
      createUserServiceSpy.mockReset();
    });

    it('should call usersService create method with payload and return the result', () => {
      const createUserBody: CreateUserDTO = {
        firstName: 'Zach',
        lastName: 'Merris',
        username: 'zcmerris',
        email: 'zcmerris@fake.com',
        password: 'p@55w0rd',
      };
      const createUserRes = controller.createUser(createUserBody);

      expect(createUserServiceSpy).toHaveBeenCalledWith(createUserBody);
      expect(createUserRes).toEqual(MOCK_USER_RESPONSE);
    });
  });

  describe('findUser', () => {
    let findUserServiceSpy: jest.SpyInstance;

    beforeEach(() => {
      findUserServiceSpy = jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => MOCK_USER_RESPONSE);
    });

    afterEach(() => {
      findUserServiceSpy.mockReset();
    });

    it('should call usersService findOne method and return the result', () => {
      const id = 'id';
      const user = controller.findUser(id);

      expect(findUserServiceSpy).toHaveBeenCalledWith(id);
      expect(user).toEqual(MOCK_USER_RESPONSE);
    });
  });

  describe('updateUser', () => {
    let updateUserServiceSpy: jest.SpyInstance;

    beforeEach(() => {
      updateUserServiceSpy = jest
        .spyOn(service, 'update')
        .mockImplementation(() => MOCK_USER_RESPONSE);
    });

    afterEach(() => {
      updateUserServiceSpy.mockReset();
    });

    it('should call usersService update method with payload and return the result', () => {
      const updateUserArg: UpdateUserDto = {
        firstName: 'Not',
        lastName: 'Zach',
        username: 'mczerris',
      };
      const updatedUser = controller.updateUser(
        updateUserArg,
        MOCK_USER_RESPONSE.id,
      );

      expect(updateUserServiceSpy).toHaveBeenCalledWith(
        MOCK_USER_RESPONSE.id,
        updateUserArg,
      );
      expect(updatedUser).toEqual(MOCK_USER_RESPONSE);
    });
  });

  describe('deleteUser', () => {
    let deleteUserServiceSpy: jest.SpyInstance;

    beforeEach(() => {
      deleteUserServiceSpy = jest
        .spyOn(service, 'delete')
        .mockImplementation(() => 'SUCCESS!');
    });

    afterEach(() => {
      deleteUserServiceSpy.mockReset();
    });

    it('should call usersService delete method with id and return 204', () => {
      const id = 'id';
      const expectedSuccessRes = `Successfully deleted user with id: ${id}`;
      const deleteUserRes = controller.deleteUser(id);

      expect(deleteUserServiceSpy).toHaveBeenCalledWith(id);
      expect(deleteUserRes).toEqual(expectedSuccessRes);
    });
  });
});
