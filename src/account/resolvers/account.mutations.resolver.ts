import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from '../account.service';
import { AccountCreateOutput } from '../dto/account-create.dto';
import { AccountCreateInput } from '../dto/account-create.dto';
import { Account } from '../models/account.model';

@Resolver(Account)
export class AccountMutationsResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => AccountCreateOutput)
  async accountCreate(@Args('input') input: AccountCreateInput) {
    return this.accountService.accountCreate(input);
  }
}
