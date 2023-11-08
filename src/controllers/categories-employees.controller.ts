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
Categories,
EmployeesCategories,
Employees,
} from '../models';
import {CategoriesRepository} from '../repositories';

export class CategoriesEmployeesController {
  constructor(
    @repository(CategoriesRepository) protected categoriesRepository: CategoriesRepository,
  ) { }

  @get('/categories/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Categories has many Employees through EmployeesCategories',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employees)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employees>,
  ): Promise<Employees[]> {
    return this.categoriesRepository.employees(id).find(filter);
  }

  @post('/categories/{id}/employees', {
    responses: {
      '200': {
        description: 'create a Employees model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employees)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categories.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {
            title: 'NewEmployeesInCategories',
            exclude: ['id'],
          }),
        },
      },
    }) employees: Omit<Employees, 'id'>,
  ): Promise<Employees> {
    return this.categoriesRepository.employees(id).create(employees);
  }

  @patch('/categories/{id}/employees', {
    responses: {
      '200': {
        description: 'Categories.Employees PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {partial: true}),
        },
      },
    })
    employees: Partial<Employees>,
    @param.query.object('where', getWhereSchemaFor(Employees)) where?: Where<Employees>,
  ): Promise<Count> {
    return this.categoriesRepository.employees(id).patch(employees, where);
  }

  @del('/categories/{id}/employees', {
    responses: {
      '200': {
        description: 'Categories.Employees DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employees)) where?: Where<Employees>,
  ): Promise<Count> {
    return this.categoriesRepository.employees(id).delete(where);
  }
}
