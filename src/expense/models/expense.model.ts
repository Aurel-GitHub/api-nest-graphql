import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from '../../account/models/account.model';
import { Node } from '../../pagination/models/node.model';
import { User } from '../../user/models/user.model';
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

  @Field(() => Number, { complexity: 3 })
  @Column()
  total: number;

  @Field(() => String, { complexity: 3 })
  @Column()
  title: string;

  @Field(() => String, { complexity: 3 })
  @Column()
  image: string;

  @Field(() => Boolean, { complexity: 3 })
  @Column()
  isFixed: boolean;
}
