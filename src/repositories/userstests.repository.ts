import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Userstests, UserstestsRelations} from '../models';

export class UserstestsRepository extends DefaultCrudRepository<
  Userstests,
  typeof Userstests.prototype.id,
  UserstestsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Userstests, dataSource);
  }
}
