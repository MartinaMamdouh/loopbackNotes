import {Entity, model, property, hasMany} from '@loopback/repository';
import {Test} from './test.model';
import {Userstests} from './userstests.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => Test, {through: {model: () => Userstests}})
  tests: Test[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
