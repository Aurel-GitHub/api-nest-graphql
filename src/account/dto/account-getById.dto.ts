import { Field, ID, InputType } from '@nestjs/graphql';
import { Account } from '../models/account.model';

@InputType()
export class accountGetById {
  @Field(() => ID)
  accountId: Account['id'];
}
