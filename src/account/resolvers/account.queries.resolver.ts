import { Resolver, Query, Args } from '@nestjs/graphql';
import { AccountService } from '../account.service';
import { AccountsPaginationArgs } from '../dto/account-pagination.dto';
import { AccountsPagination } from '../dto/account-pagination.dto';
import { Account } from '../models/account.model';

@Resolver(Account)
export class AccountQueriesResolver {
  constructor(private accountService: AccountService) {}

  @Query(() => AccountsPagination)
  async accountPagination(@Args() args: AccountsPaginationArgs) {
    return this.accountService.accountPagination(args);
  }
}
