import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Employees} from './employees.model';
import {Categories} from './categories.model';

@model()
export class EmployeesCategories extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => Employees)
  employeesId: number;

  @belongsTo(() => Categories)
  categoriesId: number;

  constructor(data?: Partial<EmployeesCategories>) {
    super(data);
  }
}

export interface EmployeesCategoriesRelations {
  // describe navigational properties here
}

export type EmployeesCategoriesWithRelations = EmployeesCategories & EmployeesCategoriesRelations;
