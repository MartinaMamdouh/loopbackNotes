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
  Categories,
} from '../models';
import {EmployeesCategoriesRepository} from '../repositories';

export class EmployeesCategoriesCategoriesController {
  constructor(
    @repository(EmployeesCategoriesRepository)
    public employeesCategoriesRepository: EmployeesCategoriesRepository,
  ) { }

  @get('/employees-categories/{id}/categories', {
    responses: {
      '200': {
        description: 'Categories belonging to EmployeesCategories',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Categories),
          },
        },
      },
    },
  })
  async getCategories(
    @param.path.number('id') id: typeof EmployeesCategories.prototype.id,
  ): Promise<Categories> {
    return this.employeesCategoriesRepository.categories(id);
  }
}
