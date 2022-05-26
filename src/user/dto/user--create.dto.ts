import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user.model';

@InputType()
export class UserCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class UserCreateOutput {
  @Field(() => User)
  user: User;
}
