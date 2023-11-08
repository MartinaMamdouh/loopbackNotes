import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Categories, CategoriesRelations, Notes, Employees, EmployeesCategories} from '../models';
import {NotesRepository} from './notes.repository';
import {EmployeesCategoriesRepository} from './employees-categories.repository';
import {EmployeesRepository} from './employees.repository';

export class CategoriesRepository extends DefaultCrudRepository<
  Categories,
  typeof Categories.prototype.id,
  CategoriesRelations
> {

  public readonly notes: HasManyRepositoryFactory<Notes, typeof Categories.prototype.id>;

  public readonly employees: HasManyThroughRepositoryFactory<Employees, typeof Employees.prototype.id,
          EmployeesCategories,
          typeof Categories.prototype.id
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('NotesRepository') protected notesRepositoryGetter: Getter<NotesRepository>, @repository.getter('EmployeesCategoriesRepository') protected employeesCategoriesRepositoryGetter: Getter<EmployeesCategoriesRepository>, @repository.getter('EmployeesRepository') protected employeesRepositoryGetter: Getter<EmployeesRepository>,
  ) {
    super(Categories, dataSource);
    this.employees = this.createHasManyThroughRepositoryFactoryFor('employees', employeesRepositoryGetter, employeesCategoriesRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
    this.notes = this.createHasManyRepositoryFactoryFor('notes', notesRepositoryGetter,);
    this.registerInclusionResolver('notes', this.notes.inclusionResolver);

  }
}
