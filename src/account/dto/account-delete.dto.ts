import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from '../models/account.model';

@ObjectType()
export class AccountDeleteOutput {
  @Field(() => ID)
  accountId: Account['id'];
}
