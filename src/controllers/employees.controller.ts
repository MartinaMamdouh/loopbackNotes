import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Employees} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesController {
  constructor(
    @repository(EmployeesRepository)
    public employeesRepository : EmployeesRepository,
  ) {}

  @post('/employees')
  @response(200, {
    description: 'Employees model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employees)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {
            title: 'NewEmployees',
            exclude: ['id'],
          }),
        },
      },
    })
    employees: Omit<Employees, 'id'>,
  ): Promise<Employees> {
    return this.employeesRepository.create(employees);
  }

  @get('/employees/count')
  @response(200, {
    description: 'Employees model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employees) where?: Where<Employees>,
  ): Promise<Count> {
    return this.employeesRepository.count(where);
  }

  @get('/employees')
  @response(200, {
    description: 'Array of Employees model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employees, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employees) filter?: Filter<Employees>,
  ): Promise<Employees[]> {
    return this.employeesRepository.find(filter);
  }

  @patch('/employees')
  @response(200, {
    description: 'Employees PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {partial: true}),
        },
      },
    })
    employees: Employees,
    @param.where(Employees) where?: Where<Employees>,
  ): Promise<Count> {
    return this.employeesRepository.updateAll(employees, where);
  }

  @get('/employees/{id}')
  @response(200, {
    description: 'Employees model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employees, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Employees, {exclude: 'where'}) filter?: FilterExcludingWhere<Employees>
  ): Promise<Employees> {
    return this.employeesRepository.findById(id, filter);
  }

  @patch('/employees/{id}')
  @response(204, {
    description: 'Employees PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {partial: true}),
        },
      },
    })
    employees: Employees,
  ): Promise<void> {
    await this.employeesRepository.updateById(id, employees);
  }

  @put('/employees/{id}')
  @response(204, {
    description: 'Employees PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() employees: Employees,
  ): Promise<void> {
    await this.employeesRepository.replaceById(id, employees);
  }

  @del('/employees/{id}')
  @response(204, {
    description: 'Employees DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeesRepository.deleteById(id);
  }
}
