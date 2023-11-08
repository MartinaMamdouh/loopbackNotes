import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Notes,
  Employees,
} from '../models';
import {NotesRepository} from '../repositories';

export class NotesEmployeesController {
  constructor(
    @repository(NotesRepository)
    public notesRepository: NotesRepository,
  ) { }

  @get('/notes/{id}/employees', {
    responses: {
      '200': {
        description: 'Employees belonging to Notes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employees),
          },
        },
      },
    },
  })
  async getEmployees(
    @param.path.number('id') id: typeof Notes.prototype.id,
  ): Promise<Employees> {
    return this.notesRepository.employees(id);
  }
}
