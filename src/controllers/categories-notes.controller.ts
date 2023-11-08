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
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Categories,
  Notes,
} from '../models';
import {CategoriesRepository, NotesRepository} from '../repositories';
// some change in git
export class CategoriesNotesController {
  constructor(
    @repository(CategoriesRepository) protected categoriesRepository: CategoriesRepository,
    @repository(NotesRepository) protected notesRepository: NotesRepository,

  ) { }

  @get('/categories/{id}/notes', {
    responses: {
      '200': {
        description: 'Array of Categories has many Notes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Notes>,
  ): Promise<Notes[]> {
    return this.categoriesRepository.notes(id).find(filter);
  }

  @post('/categories/{id}/notes', {
    responses: {
      '200': {
        description: 'Categories model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categories.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {
            title: 'NewNotesInCategories',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) notes: Omit<Notes, 'id'>,
  ): Promise<Notes> {
    return this.categoriesRepository.notes(id).create(notes);
  }



  @del('/categories/{id}/notes', {
    responses: {
      '200': {
        description: 'Categories.Notes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Notes)) where?: Where<Notes>,
  ): Promise<Count> {
    return this.categoriesRepository.notes(id).delete(where);
  }

  @patch('/categories/{id}/notes', {
    responses: {
      '200': {
        description: 'Categories.Notes PATCH success count',
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
    return this.categoriesRepository.notes(id).patch(notes, where);
  }

  @patch('/categories/updateNoteCategory')
  async assignNoteToCategory(
    // @param.path.number('id') id: number,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notes, {partial: true}),
        },
      },
    }) notes: Notes,
  ): Promise<Notes> {
    if (!notes.id) {
      throw new HttpErrors.NotFound('note id is required');
    }
    else if (!notes.categoryId) {
      throw new HttpErrors.NotFound('category id is required');
    }
    const noteData = await this.notesRepository.findById(notes.id);
    if (!noteData) {
      throw new HttpErrors.NotFound('Note not found');
    }

    const categoryData = await this.categoriesRepository.findById(notes.categoryId);
    if (!categoryData) {
      throw new HttpErrors.NotFound('category not found');
    }

    noteData.categoryId = notes.categoryId;
    noteData.title = notes.title;
    noteData.body = notes.body;
    // noteData.employeesId = notes.employeesId;
    await this.notesRepository.updateById(notes.id, noteData);
    return noteData;

  }

}
