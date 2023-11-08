import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EmployeesCategories, EmployeesCategoriesRelations, Employees, Categories} from '../models';
import {EmployeesRepository} from './employees.repository';
import {CategoriesRepository} from './categories.repository';

export class EmployeesCategoriesRepository extends DefaultCrudRepository<
  EmployeesCategories,
  typeof EmployeesCategories.prototype.id,
  EmployeesCategoriesRelations
> {

  public readonly employees: BelongsToAccessor<Employees, typeof EmployeesCategories.prototype.id>;

  public readonly categories: BelongsToAccessor<Categories, typeof EmployeesCategories.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('EmployeesRepository') protected employeesRepositoryGetter: Getter<EmployeesRepository>, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>,
  ) {
    super(EmployeesCategories, dataSource);
    this.categories = this.createBelongsToAccessorFor('categories', categoriesRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
    this.employees = this.createBelongsToAccessorFor('employees', employeesRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
