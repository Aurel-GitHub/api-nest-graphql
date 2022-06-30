import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn } from 'typeorm';
import { ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Node } from '../../pagination/models/node.model';
import { User } from '../../user/models/user.model';
import { Expense } from '../../expense/models/expense.model';

@Entity()
@ObjectType()
export class Account extends Node {
  @Field(() => String, { complexity: 3 })
  @Column()
  title: string;

  @Field(() => Number, { complexity: 3 })
  @Column()
  total: number;

  @Field(() => String, { complexity: 3 })
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn()
  user: User;

  @RelationId((self: Account) => self.user)
  readonly userId: User['id'];

  @OneToMany(() => Expense, (expense) => expense.account)
  @JoinColumn()
  expenses: Expense;
}
