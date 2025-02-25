import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from '../schemas/task.schema';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../types/task-status.enum';

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockTask),
    find: jest.fn().mockResolvedValue([mockTask]),
    findById: jest.fn().mockResolvedValue(mockTask),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockTask),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        status: TaskStatus.TODO,
      };

      const result: Task = await service.create(createTaskDto);

      expect(result).toEqual(mockTask);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = await service.findAll();

      expect(result).toEqual([mockTask]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task if found', async () => {
      const result: Task = await service.findOne(mockTask._id);

      expect(result).toEqual(mockTask);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findById).toHaveBeenCalledWith(mockTask._id);
    });

    it('should throw a NotFoundException if task not found', async () => {
      model.findById = jest.fn().mockResolvedValue(null);

      await expect(service.findOne('non-existing-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };

      const result: Task = await service.update(mockTask._id, updateTaskDto);

      expect(result).toEqual(mockTask);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockTask._id, updateTaskDto, {
        new: true,
      });
    });

    it('should throw a NotFoundException if task not found', async () => {
      model.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await expect(service.update('non-existing-id', { title: 'Updated Task' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result: void = await service.remove(mockTask._id);

      expect(result).toBeUndefined();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockTask._id);
    });

    it('should throw a NotFoundException if task not found', async () => {
      model.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await expect(service.remove('non-existing-id')).rejects.toThrow(NotFoundException);
    });
  });
});
