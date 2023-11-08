import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Categories, Employees, EmployeesCategories, EmployeesRelations, Notes} from '../models';
import {CategoriesRepository} from './categories.repository';
import {EmployeesCategoriesRepository} from './employees-categories.repository';
import {NotesRepository} from './notes.repository';

export class EmployeesRepository extends DefaultCrudRepository<
  Employees,
  typeof Employees.prototype.id,
  EmployeesRelations
> {

  public readonly categories: HasManyThroughRepositoryFactory<Categories, typeof Categories.prototype.id,
    EmployeesCategories,
    typeof Employees.prototype.id
  >;

  public readonly notes: HasOneRepositoryFactory<Notes, typeof Employees.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('EmployeesCategoriesRepository') protected employeesCategoriesRepositoryGetter: Getter<EmployeesCategoriesRepository>, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>, @repository.getter('NotesRepository') protected notesRepositoryGetter: Getter<NotesRepository>,
  ) {
    super(Employees, dataSource);
    this.notes = this.createHasOneRepositoryFactoryFor('notes', notesRepositoryGetter);
    this.registerInclusionResolver('notes', this.notes.inclusionResolver);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoriesRepositoryGetter, employeesCategoriesRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
