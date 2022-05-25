import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountCreateOutput } from './dto/account-create.dto';
import { AccountCreateInput } from './dto/account-create.dto';
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
}
