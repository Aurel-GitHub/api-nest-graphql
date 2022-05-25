import { InputType, ObjectType } from '@nestjs/graphql';
import { AccountCreateInput, AccountCreateOutput } from './account-create.dto';

@InputType()
export class AccountUpdateInput extends AccountCreateInput {}

@ObjectType()
export class AccountUpdateOutput extends AccountCreateOutput {}
