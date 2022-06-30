import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { BaseEntity, CreateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@InterfaceType()
export abstract class Node extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date, { complexity: 3 })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { complexity: 3 })
  @UpdateDateColumn()
  updatedAt: Date;
}
