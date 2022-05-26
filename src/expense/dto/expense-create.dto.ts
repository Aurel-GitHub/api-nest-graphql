import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Expense } from '../models/expense.model';

@InputType()
export class ExpenseCreateInput {
  @Field(() => String)
  accountId: string;

  @Field(() => Number)
  total: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  image: string;

  @Field(() => Boolean)
  isFixed: boolean;
}

@ObjectType()
export class ExpenseCreateOutput {
  @Field(() => Expense)
  expense: Expense;
}
