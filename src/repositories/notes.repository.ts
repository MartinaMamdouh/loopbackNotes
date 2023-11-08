import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Categories, Notes, NotesRelations, Employees} from '../models';
import {CategoriesRepository} from './categories.repository';
import {EmployeesRepository} from './employees.repository';

export class NotesRepository extends DefaultCrudRepository<
  Notes,
  typeof Notes.prototype.id,
  NotesRelations
> {

  public readonly category: BelongsToAccessor<Categories, typeof Notes.prototype.id>;

  public readonly employees: BelongsToAccessor<Employees, typeof Notes.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>, @repository.getter('EmployeesRepository') protected employeesRepositoryGetter: Getter<EmployeesRepository>,
  ) {
    super(Notes, dataSource);
    this.employees = this.createBelongsToAccessorFor('employees', employeesRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
    this.category = this.createBelongsToAccessorFor(
      'category',
      categoriesRepositoryGetter
    );
    this.registerInclusionResolver('category', this.category.inclusionResolver);

  }
}
