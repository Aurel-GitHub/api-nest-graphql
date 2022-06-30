import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from '../../pagination/dto/pagination.dto';
import { Pagination } from '../../pagination/dto/pagination.dto';
import { PaginationSortBy } from '../../pagination/dto/pagination.dto';
import { SortDirection } from '../../pagination/dto/pagination.dto';
import { Account } from '../models/account.model';

@InputType()
export class AccountPaginationSortBy extends PaginationSortBy {
  @Field(() => SortDirection, { nullable: true })
  title?: SortDirection;
  total?: SortDirection;
}

@ArgsType()
export class AccountsPaginationArgs extends PaginationArgs {
  @Field(() => AccountPaginationSortBy, { nullable: true })
  sortBy: AccountPaginationSortBy;
}

@ObjectType()
export class AccountsPagination extends Pagination {
  @Field(() => [Account])
  nodes: Account[];
}
