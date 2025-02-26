import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskForm from '../components/TaskForm.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useTaskStore } from '../store/tasks';
import router from '../router';
import CreateTask from './CreateTask.vue';

vi.mock('../router', () => ({
  default: {
    push: vi.fn(),
  },
}));

describe('CreateTask.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the task form', () => {
    const wrapper = mount(CreateTask);
    expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
  });

  it('calls addTask and navigates on successful submission', async () => {
    const taskStore = useTaskStore();
    vi.spyOn(taskStore, 'addTask').mockResolvedValue();

    const wrapper = mount(CreateTask);
    wrapper.findComponent(TaskForm).vm.$emit('task-submit', {
      title: 'New Task',
      description: 'Task Description',
      status: 'TODO',
    });
    await flushPromises();

    expect(taskStore.addTask).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(router.push).toHaveBeenCalledWith('/');
  });

  it('displays an error message when addTask fails', async () => {
    const taskStore = useTaskStore();
    vi.spyOn(taskStore, 'addTask').mockRejectedValue(new Error('Erreur lors de la suppression.'));

    const wrapper = mount(CreateTask);
    wrapper.findComponent(TaskForm).vm.$emit('task-submit', {
      title: 'New Task',
      description: 'Task Description',
      status: 'TODO',
    });
    await flushPromises();

    expect(wrapper.text()).toContain('Erreur lors de la suppression.');
  });
});
