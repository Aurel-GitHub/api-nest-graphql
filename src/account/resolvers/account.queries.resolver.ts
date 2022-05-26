import { Resolver, Query } from '@nestjs/graphql';
import { AccountService } from '../account.service';
import { Account } from '../models/account.model';

@Resolver(Account)
export class AccountQueriesResolver {
  constructor(private accountService: AccountService) {}

  @Query(() => [Account])
  async accountList() {
    return this.accountService.accountsList();
  }
}
