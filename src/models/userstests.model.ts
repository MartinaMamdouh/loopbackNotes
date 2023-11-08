import {Entity, model, property} from '@loopback/repository';

@model()
export class Userstests extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  userId?: number;

  @property({
    type: 'number',
  })
  testId?: number;

  constructor(data?: Partial<Userstests>) {
    super(data);
  }
}

export interface UserstestsRelations {
  // describe navigational properties here
}

export type UserstestsWithRelations = Userstests & UserstestsRelations;
