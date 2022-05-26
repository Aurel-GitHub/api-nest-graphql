import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { Node } from 'src/pagination/models/node.model';

@Entity()
@ObjectType()
export class User extends Node {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column()
  avatar?: string;
}
