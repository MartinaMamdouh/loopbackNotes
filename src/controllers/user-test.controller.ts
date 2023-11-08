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
User,
Userstests,
Test,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTestController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'Array of User has many Test through Userstests',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Test)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Test>,
  ): Promise<Test[]> {
    return this.userRepository.tests(id).find(filter);
  }

  @post('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'create a Test model instance',
        content: {'application/json': {schema: getModelSchemaRef(Test)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {
            title: 'NewTestInUser',
            exclude: ['id'],
          }),
        },
      },
    }) test: Omit<Test, 'id'>,
  ): Promise<Test> {
    return this.userRepository.tests(id).create(test);
  }

  @patch('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'User.Test PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {partial: true}),
        },
      },
    })
    test: Partial<Test>,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.userRepository.tests(id).patch(test, where);
  }

  @del('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'User.Test DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.userRepository.tests(id).delete(where);
  }
}
