import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Node } from 'src/pagination/models/node.model';
import { Account } from 'src/account/models/account.model';

@Entity()
@ObjectType()
export class User extends Node {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Account, (target) => target.user)
  accounts: Account[];
}
