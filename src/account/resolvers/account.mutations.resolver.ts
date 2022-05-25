import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AccountCreateOutput } from '../dto/account-create.dto';
import { AccountCreateInput } from '../dto/account-create.dto';
import { AccountUpdateOutput } from '../dto/account-update.dto';
import { AccountUpdateInput } from '../dto/account-update.dto';
import { AccountService } from '../account.service';
import { Account } from '../models/account.model';
import { AccountDeleteOutput } from '../dto/account-delete.dto';
import { type } from 'os';

@Resolver(Account)
export class AccountMutationsResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => AccountCreateOutput)
  async accountCreate(@Args('input') input: AccountCreateInput) {
    return this.accountService.accountCreate(input);
  }

  @Mutation(() => AccountUpdateOutput)
  async accountUpdate(
    @Args({ name: 'accountId', type: () => ID }) accountId: Account['id'],
    @Args('input') input: AccountUpdateInput,
  ) {
    return this.accountService.accountUpdate(accountId, input);
  }

  @Mutation(() => AccountDeleteOutput)
  async accountDelete(
    @Args({ name: 'accountId', type: () => ID }) accountId: Account['id'],
  ) {
    return this.accountService.accountDelete(accountId);
  }
}
