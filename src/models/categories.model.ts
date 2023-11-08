import {Entity, hasMany, model, property} from '@loopback/repository';
import {Notes} from './notes.model';
import {Employees} from './employees.model';
import {EmployeesCategories} from './employees-categories.model';

@model()
export class Categories extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
  })
  quantity?: number;

  @hasMany(() => Notes, {name: 'notes', keyTo: 'categoryId'})
  notes: Notes[];

  @hasMany(() => Employees, {through: {model: () => EmployeesCategories}})
  employees: Employees[];

  constructor(data?: Partial<Categories>) {
    super(data);
  }
}

export interface CategoriesRelations {
  // describe navigational properties here
}

export type CategoriesWithRelations = Categories & CategoriesRelations;
