import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Node } from 'src/pagination/models/node.model';
import { User } from 'src/user/models/user.model';

@Entity()
@ObjectType()
export class Account extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Number)
  @Column()
  total: number;

  @Field(() => String)
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn()
  user: User;

  @RelationId((self: Account) => self.user)
  readonly userId: User['id'];
}
