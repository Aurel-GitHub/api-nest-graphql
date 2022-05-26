import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { Node } from 'src/pagination/models/node.model';

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
}
