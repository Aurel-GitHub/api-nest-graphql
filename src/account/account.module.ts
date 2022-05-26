import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from './models/account.model';
import { AccountMutationsResolver } from './resolvers/account.mutations.resolver';
import { AccountQueriesResolver } from './resolvers/account.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountMutationsResolver, AccountQueriesResolver],
})
export class AccountModule {}
