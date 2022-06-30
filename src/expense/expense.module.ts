import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { ExpenseService } from './expense.service';
import { Expense } from './models/expense.model';
import { ExpenseMutationResolver } from './resolvers/expense.mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), UserModule, AccountModule],
  providers: [ExpenseService, ExpenseMutationResolver],
})
export class ExpenseModule {}
