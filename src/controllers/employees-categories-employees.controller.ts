import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EmployeesCategories,
  Employees,
} from '../models';
import {EmployeesCategoriesRepository} from '../repositories';

export class EmployeesCategoriesEmployeesController {
  constructor(
    @repository(EmployeesCategoriesRepository)
    public employeesCategoriesRepository: EmployeesCategoriesRepository,
  ) { }

  @get('/employees-categories/{id}/employees', {
    responses: {
      '200': {
        description: 'Employees belonging to EmployeesCategories',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employees),
          },
        },
      },
    },
  })
  async getEmployees(
    @param.path.number('id') id: typeof EmployeesCategories.prototype.id,
  ): Promise<Employees> {
    return this.employeesCategoriesRepository.employees(id);
  }
}
