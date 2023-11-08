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
  Employees
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesCategoriesController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Employees has many Categories through EmployeesCategories',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categories)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categories>,
  ): Promise<Categories[]> {
    return this.employeesRepository.categories(id).find(filter);
  }

  @post('/employees/{id}/categories', {
    responses: {
      '200': {
        description: 'create a Categories model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categories)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employees.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategoriesInEmployees',
            exclude: ['id'],
          }),
        },
      },
    }) categories: Omit<Categories, 'id'>,
  ): Promise<Categories> {
    return this.employeesRepository.categories(id).create(categories);
  }

  @patch('/employees/{id}/categories', {
    responses: {
      '200': {
        description: 'Employees.Categories PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Partial<Categories>,
    @param.query.object('where', getWhereSchemaFor(Categories)) where?: Where<Categories>,
  ): Promise<Count> {
    return this.employeesRepository.categories(id).patch(categories, where);
  }

  @del('/employees/{id}/categories', {
    responses: {
      '200': {
        description: 'Employees.Categories DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categories)) where?: Where<Categories>,
  ): Promise<Count> {
    return this.employeesRepository.categories(id).delete(where);
  }
}
