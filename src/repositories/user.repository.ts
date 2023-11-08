import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {User, UserRelations, Test, Userstests} from '../models';
import {UserstestsRepository} from './userstests.repository';
import {TestRepository} from './test.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly tests: HasManyThroughRepositoryFactory<Test, typeof Test.prototype.id,
          Userstests,
          typeof User.prototype.id
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UserstestsRepository') protected userstestsRepositoryGetter: Getter<UserstestsRepository>, @repository.getter('TestRepository') protected testRepositoryGetter: Getter<TestRepository>,
  ) {
    super(User, dataSource);
    this.tests = this.createHasManyThroughRepositoryFactoryFor('tests', testRepositoryGetter, userstestsRepositoryGetter,);
    this.registerInclusionResolver('tests', this.tests.inclusionResolver);
  }
}
