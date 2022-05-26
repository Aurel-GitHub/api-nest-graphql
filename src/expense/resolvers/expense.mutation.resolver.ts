import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IJwtPayload } from 'src/auth/interfaces/IJwtPayload';
import { ExpenseCreateOutput } from '../dto/expense-create.dto';
import { ExpenseCreateInput } from '../dto/expense-create.dto';
import { ExpenseService } from '../expense.service';
import { Expense } from '../models/expense.model';

@Resolver(Expense)
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
