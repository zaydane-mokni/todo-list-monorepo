import { setActivePinia, createPinia } from 'pinia';
import { useTaskStore } from './tasks.ts';
import apiClient from '../api/axios.ts';
import { describe, vi, beforeEach, it, expect } from 'vitest';
import { TaskStatus } from '../types/task.ts';

vi.mock('@/api/axios');

describe('TaskStore', () => {
  let taskStore: ReturnType<typeof useTaskStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    taskStore = useTaskStore();
  });

  describe('fetchTasks', () => {
    it('should fetch tasks successfully', async () => {
      const mockTasks = [
        { _id: '1', title: 'Test Task', description: 'A sample task', status: TaskStatus.TODO },
      ];

      vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockTasks });

      await taskStore.fetchTasks();

      expect(taskStore.tasks).toEqual(mockTasks);
      expect(taskStore.loading).toBe(false);
    });

    it('should handle errors', async () => {
      vi.spyOn(apiClient, 'get').mockRejectedValue(new Error('API Error'));

      await expect(taskStore.fetchTasks()).rejects.toThrow('Erreur lors du chargement des tâches.');
      expect(taskStore.loading).toBe(false);
    });
  });

  describe('getTaskById', () => {
    it('should fetch a task by id successfully', async () => {
      const mockTask = { _id: '1', title: 'Test Task', description: 'A sample task', status: TaskStatus.TODO };
      vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockTask });

      const result = await taskStore.getTaskById('1');

      expect(result).toEqual(mockTask);
      expect(taskStore.loading).toBe(false);
    });

    it('should handle errors', async () => {
      vi.spyOn(apiClient, 'get').mockRejectedValue(new Error('API Error'));

      await expect(taskStore.getTaskById('1')).rejects.toThrow('Erreur lors du chargement de la tâche.');
      expect(taskStore.loading).toBe(false);
    });
  });

  describe('addTask', () => {
    it('should add a new task successfully', async () => {
      const newTask = { title: 'New Task', description: 'Task description', status: TaskStatus.TODO };
      const mockTask = { _id: '2', ...newTask };

      vi.spyOn(apiClient, 'post').mockResolvedValue({ data: mockTask });

      await taskStore.addTask(newTask);

      expect(taskStore.tasks).toContainEqual(mockTask);
      expect(taskStore.loading).toBe(false);
    });

    it('should handle errors', async () => {
      const newTask = { title: 'New Task', description: 'Task description', status: TaskStatus.TODO };

      vi.spyOn(apiClient, 'post').mockRejectedValue(new Error('API Error'));

      await expect(taskStore.addTask(newTask)).rejects.toThrow('Erreur lors de l\'ajout de la tâche.');
      expect(taskStore.loading).toBe(false);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const updatedTask = { title: 'Updated Task', description: 'Updated description', status: TaskStatus.IN_PROGRESS };
      const taskId = '1';
      const mockUpdatedTask = { _id: taskId, ...updatedTask };
      taskStore.tasks = [{ _id: taskId, title: 'Old Task', description: 'Old description', status: TaskStatus.TODO }];

      vi.spyOn(apiClient, 'patch').mockResolvedValue({ data: mockUpdatedTask });

      await taskStore.updateTask(taskId, updatedTask);

      expect(taskStore.tasks).toContainEqual(mockUpdatedTask);
      expect(taskStore.loading).toBe(false);
    });

    it('should handle errors', async () => {
      const updatedTask = { title: 'Updated Task', description: 'Updated description', status: TaskStatus.IN_PROGRESS };
      const taskId = '1';

      vi.spyOn(apiClient, 'patch').mockRejectedValue(new Error('API Error'));

      await expect(taskStore.updateTask(taskId, updatedTask)).rejects.toThrow('Erreur lors de la mise à jour.');
      expect(taskStore.loading).toBe(false);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const taskId = '1';
      taskStore.tasks = [{ _id: taskId, title: 'Test Task', description: 'Task description', status: TaskStatus.TODO }];

      vi.spyOn(apiClient, 'delete').mockResolvedValue({});

      await taskStore.deleteTask(taskId);

      expect(taskStore.tasks).toEqual([]);
      expect(taskStore.loading).toBe(false);
    });

    it('should handle errors', async () => {
      const taskId = '1';

      vi.spyOn(apiClient, 'delete').mockRejectedValue(new Error('API Error'));

      await expect(taskStore.deleteTask(taskId)).rejects.toThrow('Erreur lors de la suppression.');
      expect(taskStore.loading).toBe(false);
    });
  });
});
