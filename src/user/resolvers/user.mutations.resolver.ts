import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlThrottlerGuard } from 'src/security/guards/gql-throttler.guard';
import { UserCreateInput, UserCreateOutput } from '../dto/user--create.dto';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(User)
@UseGuards(GqlThrottlerGuard, GqlAuthGuard)
export class UserMutationResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserCreateOutput)
  async userCreate(@Args('input') input: UserCreateInput) {
    return this.userService.userCreate(input);
  }
}
