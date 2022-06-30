import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../auth/interfaces/IJwtPayload';
import { Repository } from 'typeorm';
import { ExpenseCreateInput } from './dto/expense-create.dto';
import { ExpenseCreateOutput } from './dto/expense-create.dto';
import { Expense } from './models/expense.model';
import { AccountService } from '../account/account.service';
import { User } from '../user/models/user.model';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    private accountService: AccountService,
  ) {}

  async expenseCreate(
    user: IJwtPayload,
    input: ExpenseCreateInput,
  ): Promise<ExpenseCreateOutput> {
    const account = await this.accountService.accountGetById(input.accountId);
    const expense = await this.expenseRepository.create(input);

    expense.user = new User();
    expense.user.id = user.id;
    expense.account = account;
    expense.image = input.image;
    expense.total = input.total;
    expense.title = input.title;
    await expense.save();

    return { expense };
  }
}
