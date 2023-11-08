import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Categories} from '../models';
import {CategoriesRepository, EmployeesRepository, NotesRepository} from '../repositories';

export class CategoriesController {
  constructor(
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
    @repository(NotesRepository)
    public notesRepository: NotesRepository,
    @repository(EmployeesRepository)
    public employeesRepository: EmployeesRepository,
  ) { }


  @get('/viewAll/{id}')

  async view(
    @param.path.number('id') categoryId: number
  ): Promise<any> {
    const category = await this.categoriesRepository.find({
      where: {id: categoryId},
      include: [{
        relation: 'notes',
        scope: {
          include: [{
            relation: 'employees'
          }]
        }
      }]
    });

    // const category = await this.findById(categoryId);
    // console.log("category");
    // console.log(category);

    // const where: Where<Notes> = {categoryId: categoryId};
    // const notes = await this.notesRepository.find({where});
    // console.log("notes");
    // console.log(notes);

    // for (const note of notes) {
    //   const where: Where<Employees> = {notesId: note.id};
    //   const employees = await this.employeesRepository.find({where});
    //   console.log("employees");
    //   console.log(employees);

    // const employees = await this.employeesRepository.findById(noteId); //id of employee
    // note.employees = employees
    // }

    // category.notes = notes;

    console.log("category new");
    console.log(category);

    return category;
  }

  @get('/categories/except/{employeeId}')
  async getCategoryExecpt(
    @param.path.number('employeeId') employeeId: number
  ) {
    const category = await this.categoriesRepository.find({
      include: [{
        relation: 'notes',
        scope: {
          where: {employeesId: {neq: employeeId}},
          include: [{
            relation: 'employees',
          }]
        }
      }]
    });

    return category;
  }


  @post('/categories')
  @response(200, {
    description: 'Categories model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategories',
            exclude: ['id'],
          }),
        },
      },
    })
    categories: Omit<Categories, 'id'>,
  ): Promise<Categories> {
    return this.categoriesRepository.create(categories);
  }

  @get('/categories/count')
  @response(200, {
    description: 'Categories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Categories) where?: Where<Categories>,
  ): Promise<Count> {
    return this.categoriesRepository.count(where);
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Categories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Categories) filter?: Filter<Categories>,
  ): Promise<Categories[]> {
    return this.categoriesRepository.find(filter);
  }

  @patch('/categories')
  @response(200, {
    description: 'Categories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Categories,
    @param.where(Categories) where?: Where<Categories>,
  ): Promise<Count> {
    return this.categoriesRepository.updateAll(categories, where);
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Categories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Categories, {exclude: 'where'}) filter?: FilterExcludingWhere<Categories>
  ): Promise<Categories> {
    return this.categoriesRepository.findById(id, filter);
  }

  @patch('/categories/{id}')
  @response(204, {
    description: 'Categories PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Categories,
  ): Promise<void> {
    await this.categoriesRepository.updateById(id, categories);
  }

  @put('/categories/{id}')
  @response(204, {
    description: 'Categories PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() categories: Categories,
  ): Promise<void> {
    await this.categoriesRepository.replaceById(id, categories);
  }

  @del('/categories/{id}')
  @response(204, {
    description: 'Categories DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoriesRepository.deleteById(id);
  }


}
