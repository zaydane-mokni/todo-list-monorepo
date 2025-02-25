import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from '../service/tasks.service';
import { TaskStatus } from '../types/task-status.enum';
import { TasksModule } from '../tasks.module';

describe('TasksController (Integration)', () => {
  let app: INestApplication;
  let service: TasksService;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/nestjs_test_db')],
    }).compile();

    app = module.createNestApplication();
    service = module.get<TasksService>(TasksService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const createTaskDto = {
        title: 'New Task',
        description: 'New Task Description',
        status: TaskStatus.TODO,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockTask);

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(createTaskDto)
        .expect(201);

      expect(response.body).toEqual(mockTask);
    });
  });

  describe('GET /tasks', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockTask]);

      const response = await request(app.getHttpServer()).get('/tasks').expect(200);

      expect(response.body).toEqual([mockTask]);
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a task if found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTask);

      const response = await request(app.getHttpServer()).get(`/tasks/${mockTask._id}`).expect(200);

      expect(response.body).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      const invalidId = 'invalid_id';
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Task not found'));

      const response = await request(app.getHttpServer()).get(`/tasks/${invalidId}`).expect(404);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update and return a task', async () => {
      const updateTaskDto = { title: 'Updated Task' };

      jest.spyOn(service, 'update').mockResolvedValue(mockTask);

      const response = await request(app.getHttpServer())
        .patch(`/tasks/${mockTask._id}`)
        .send(updateTaskDto)
        .expect(200);

      expect(response.body).toEqual(mockTask);
    });

    it('should throw NotFoundException if task to update does not exist', async () => {
      const updateTaskDto = { title: 'Updated Task' };
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Task not found'));

      const response = await request(app.getHttpServer())
        .patch(`/tasks/invalid_id`)
        .send(updateTaskDto)
        .expect(404);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should remove a task', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const response = await request(app.getHttpServer())
        .delete(`/tasks/${mockTask._id}`)
        .expect(200);

      expect(response.body).toEqual({});
    });

    it('should throw NotFoundException if task to delete does not exist', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Task not found'));

      const response = await request(app.getHttpServer()).delete(`/tasks/invalid_id`).expect(404);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.message).toBe('Task not found');
    });
  });
});
