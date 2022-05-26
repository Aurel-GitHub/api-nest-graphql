import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/account/models/account.model';
import { Node } from 'src/pagination/models/node.model';
import { User } from 'src/user/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class Expense extends Node {
  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn()
  user: User;

  @RelationId((self: Expense) => self.user)
  readonly userId: User['id'];

  @ManyToOne(() => Account, (account) => account.expenses)
  @JoinColumn()
  account: Account;

  @RelationId((self: Expense) => self.account)
  readonly accountId: Account['id'];

  @Field(() => Number)
  @Column()
  total: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  image: string;

  @Field(() => Boolean)
  @Column()
  isFixed: boolean;
}
