import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountCreateOutput } from './dto/account-create.dto';
import { AccountCreateInput } from './dto/account-create.dto';
import { AccountDeleteOutput } from './dto/account-delete.dto';
import { AccountUpdateInput } from './dto/account-update.dto';
import { AccountUpdateOutput } from './dto/account-update.dto';
import { Account } from './models/account.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async accountCreate(input: AccountCreateInput): Promise<AccountCreateOutput> {
    const newAccount = this.accountRepository.create(input);
    const account = await this.accountRepository.save(newAccount);
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
}
