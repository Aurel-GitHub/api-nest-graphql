import { Args, Mutation } from '@nestjs/graphql';
import { AccountService } from '../account.service';
import { AccountCreateOutput } from '../dto/account-create.dto';
import { AccountCreateInput } from '../dto/account-create.dto';

export class ArticleMutationsResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => AccountCreateOutput)
  async accountCreate(@Args('input') input: AccountCreateInput) {
    return this.accountService.createAccount(input);
  }
}
