import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Employees,
  Notes,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesNotesController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/notes', {
    responses: {
      '200': {
        description: 'Employees has one Notes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Notes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Notes>,
  ): Promise<Notes> {
    return this.employeesRepository.notes(id).get(filter);
  }

  @post('/employees/{id}/notes', {
    responses: {
      '200': {
        description: 'Employees model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employees.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {
            title: 'NewNotesInEmployees',
            exclude: ['id'],
            optional: ['employeesId']
          }),
        },
      },
    }) notes: Omit<Notes, 'id'>,
  ): Promise<Notes> {
    return this.employeesRepository.notes(id).create(notes);
  }

  @patch('/employees/{id}/notes', {
    responses: {
      '200': {
        description: 'Employees.Notes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {partial: true}),
        },
      },
    })
    notes: Partial<Notes>,
    @param.query.object('where', getWhereSchemaFor(Notes)) where?: Where<Notes>,
  ): Promise<Count> {
    return this.employeesRepository.notes(id).patch(notes, where);
  }

  @del('/employees/{id}/notes', {
    responses: {
      '200': {
        description: 'Employees.Notes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Notes)) where?: Where<Notes>,
  ): Promise<Count> {
    return this.employeesRepository.notes(id).delete(where);
  }
}
