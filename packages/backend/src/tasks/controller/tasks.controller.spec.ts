import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../types/task-status.enum';
import { Task } from '../schemas/task.schema';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
  };

  const mockTasksService = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Task Description',
        status: TaskStatus.TODO,
      };

      const result: Task = await controller.create(createTaskDto);

      expect(result).toEqual(mockTask);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = await controller.findAll();

      expect(result).toEqual([mockTask]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const result: Task = await controller.findOne(mockTask._id);

      expect(result).toEqual(mockTask);
      expect(service.findOne).toHaveBeenCalledWith(mockTask._id);
    });
  });

  describe('update', () => {
    it('should update and return a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task Title' };

      const result: Task = await controller.update(mockTask._id, updateTaskDto);

      expect(result).toEqual(mockTask);
      expect(service.update).toHaveBeenCalledWith(mockTask._id, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result: void = await controller.remove(mockTask._id);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(mockTask._id);
    });
  });
});
