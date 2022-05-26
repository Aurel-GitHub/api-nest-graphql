import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from 'src/auth/interfaces/IJwtPayload';
import { SortDirection } from 'src/pagination/dto/pagination.dto';
import { User } from 'src/user/models/user.model';
import { Repository } from 'typeorm';
import { AccountCreateOutput } from './dto/account-create.dto';
import { AccountCreateInput } from './dto/account-create.dto';
import { AccountDeleteOutput } from './dto/account-delete.dto';
import { AccountsPaginationArgs } from './dto/account-pagination.dto';
import { AccountsPagination } from './dto/account-pagination.dto';
import { AccountUpdateInput } from './dto/account-update.dto';
import { AccountUpdateOutput } from './dto/account-update.dto';
import { Account } from './models/account.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async accountCreate(
    user: IJwtPayload,
    input: AccountCreateInput,
  ): Promise<AccountCreateOutput> {
    const account = this.accountRepository.create(input);
    account.user = new User();
    account.user.id = user.id;
    await account.save();
    return { account };
  }

  async accountUpdate(
    accountId: Account['id'],
    input: AccountUpdateInput,
  ): Promise<AccountUpdateOutput> {
    const account = await this.accountRepository.findOneOrFail(accountId);
    account.title = input.title;
    account.image = input.image;
    account.total = input.total;
    await account.save();
    return { account };
  }

  async accountDelete(accountId: Account['id']): Promise<AccountDeleteOutput> {
    const account = await this.accountRepository.findOneOrFail(accountId);
    await account.remove();
    return { accountId };
  }

  async accountPagination(
    args: AccountsPaginationArgs,
  ): Promise<AccountsPagination> {
    const queryBuilder = this.accountRepository.createQueryBuilder('account');
    queryBuilder.take(args.take);
    queryBuilder.take(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== null) {
        queryBuilder.addOrderBy(
          'account.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== null) {
        queryBuilder.addOrderBy(
          'account.title',
          args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    }

    const [nodes, totalCount] = await queryBuilder.getManyAndCount();

    return { nodes, totalCount };
  }
}
