import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Categories} from './categories.model';
import {Employees} from './employees.model';

@model()
export class Notes extends Entity {
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
  title: string;

  @property({
    type: 'string',
  })
  body?: string;

  @belongsTo(() => Categories, {name: 'category'})
  categoryId: number;

  @belongsTo(() => Employees)
  employeesId: number;

  constructor(data?: Partial<Notes>) {
    super(data);
  }
}



export interface NotesRelations {
  // describe navigational properties here
}

export type NotesWithRelations = Notes & NotesRelations;
