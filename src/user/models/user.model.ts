import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Node } from '../../pagination/models/node.model';
import { Account } from '../../account/models/account.model';
import { Expense } from '../../expense/models/expense.model';

@Entity()
@ObjectType()
export class User extends Node {
  @Field(() => String, { complexity: 3 })
  @Column()
  name: string;

  @Field(() => String, { complexity: 3 })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true, complexity: 3 })
  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Account, (target) => target.user)
  accounts: Account[];

  @OneToMany(() => Expense, (target) => target.user)
  expenses: Expense[];
}
