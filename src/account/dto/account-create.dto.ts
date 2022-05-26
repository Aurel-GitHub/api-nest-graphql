import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Account } from '../models/account.model';

@InputType()
export class AccountCreateInput {
  @Field(() => String)
  title: string;
  @Field(() => Number)
  total: number;
  @Field(() => String)
  image: string;
}

@ObjectType()
export class AccountCreateOutput {
  @Field(() => Account)
  account: Account;
}
