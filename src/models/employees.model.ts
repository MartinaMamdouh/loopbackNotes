import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Categories} from './categories.model';
import {EmployeesCategories} from './employees-categories.model';
import {Notes} from './notes.model';

@model()
export class Employees extends Entity {
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
  name: string;

  @hasMany(() => Categories, {through: {model: () => EmployeesCategories}})
  categories: Categories[];

  @hasOne(() => Notes)
  notes: Notes;

  constructor(data?: Partial<Employees>) {
    super(data);
  }
}

export interface EmployeesRelations {
  // describe navigational properties here
}

export type EmployeesWithRelations = Employees & EmployeesRelations;
