/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Account } from './models/account.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveOptions, Repository, SaveOptions } from 'typeorm';
import { AccountCreateInput } from './dto/account-create.dto';
import { IJwtPayload } from '../auth/interfaces/IJwtPayload';
import { User } from '../user/models/user.model';
import { Expense } from '../expense/models/expense.model';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('AccountService', () => {
  let service: AccountService;
  const accountRepositoryMock: MockType<Repository<Account>> = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: accountRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<AccountService>(AccountService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new account', async () => {
      const accountDTO: AccountCreateInput = {
        title: 'unit test - create -  account ',
        total: 4587978,
        image: 'sdfsdfsdfcxwcxcxc',
      };
      const user: IJwtPayload = {
        id: '1234586',
        name: 'test',
        email: 'test@yopmail.com',
      };
      accountRepositoryMock.save.mockReturnValue(accountDTO);
      const newAccount = await service.accountCreate(user, accountDTO);
      expect(newAccount).toMatchObject(accountDTO);
      expect(accountRepositoryMock.save).toHaveBeenCalledWith(accountDTO);
    });
  });

  describe('findOne', () => {
    it('should find a account by id', async () => {
      const account: Account = {
        title: 'unit test - create -  account ',
        total: 4587978,
        image: 'sdfsdfsdfcxwcxcxc',
        user: new User(),
        userId: '546',
        expenses: new Expense(),
        id: 'qsdqsd',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Account> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Account> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Account> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Account> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      accountRepositoryMock.findOneOrFail.mockReturnValue(account);
      const foundAccount = await service.accountGetById(account.id);
      expect(foundAccount).toMatchObject(account);
      expect(accountRepositoryMock.findOne).toHaveBeenCalledWith(account.id);
    });
  });
});
