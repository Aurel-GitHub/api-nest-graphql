import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CurrentUser, JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IJwtPayload } from '../../auth/interfaces/IJwtPayload';
import { GqlThrottlerGuard } from '../../security/guards/gql-throttler.guard';
import { ExpenseCreateOutput } from '../dto/expense-create.dto';
import { ExpenseCreateInput } from '../dto/expense-create.dto';
import { ExpenseService } from '../expense.service';
import { Expense } from '../models/expense.model';

@Resolver(Expense)
@UseGuards(GqlThrottlerGuard, GqlAuthGuard)
export class ExpenseMutationResolver {
  constructor(private expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ExpenseCreateOutput)
  async expenseCreate(
    @CurrentUser() user: IJwtPayload,
    @Args('input') input: ExpenseCreateInput,
  ) {
    return this.expenseService.expenseCreate(user, input);
  }
}
