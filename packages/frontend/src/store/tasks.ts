import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '../types/task.ts';
import apiClient from '../api/axios.ts';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref<boolean>(false);

  const fetchTasks = async (): Promise<void> => {
    loading.value = true;
    try {
      const res = await apiClient.get('/tasks');
      tasks.value = res.data;
    } catch {
      throw new Error('Erreur lors du chargement des tâches.');
    } finally {
      loading.value = false;
    }
  };

  const getTaskById = async (id: string): Promise<Task> => {
    loading.value = true;
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    } catch {
      throw new Error('Erreur lors du chargement de la tâche.');
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (task: Partial<Task>): Promise<void> => {
    loading.value = true;
    try {
      const res = await apiClient.post('/tasks', task);
      tasks.value.push(res.data);
    } catch {
      throw new Error('Erreur lors de l\'ajout de la tâche.');
    } finally {
      loading.value = false;
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<void> => {
    loading.value = true;
    try {
      const res = await apiClient.patch(`/tasks/${id}`, updatedTask);
      const index = tasks.value.findIndex((task) => task._id === id);
      if (index !== -1) {
        tasks.value[index] = res.data;
      }
    } catch {
      throw new Error('Erreur lors de la mise à jour.');
    } finally {
      loading.value = false;
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    loading.value = true;
    try {
      await apiClient.delete(`/tasks/${id}`);
      tasks.value = tasks.value.filter((task) => task._id !== id);
    } catch {
      throw new Error('Erreur lors de la suppression.');
    } finally {
      loading.value = false;
    }
  };

  return { tasks, loading, fetchTasks, getTaskById, addTask, updateTask, deleteTask };
});
