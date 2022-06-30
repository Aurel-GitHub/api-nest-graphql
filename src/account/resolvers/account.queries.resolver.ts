import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GqlThrottlerGuard } from '../../security/guards/gql-throttler.guard';
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

  @UseGuards(JwtAuthGuard, GqlThrottlerGuard, GqlAuthGuard)
  @Query(() => Account)
  async getAccount(@Args('id') id: string): Promise<Account> {
    return this.accountService.accountGetById(id);
  }
}
