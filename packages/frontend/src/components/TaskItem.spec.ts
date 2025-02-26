import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskItem from '../components/TaskItem.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useTaskStore } from '../store/tasks';
import router from '../router';
import { TaskStatus, type Task } from '../types/task';

vi.mock('../router', () => ({
  default: {
    push: vi.fn(),
  },
}));

describe('TaskItem.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockTask: Task = {
    _id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    status: TaskStatus.TODO,
  };

  it('displays task details', () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
    });

    expect(wrapper.text()).toContain(mockTask.title);
    expect(wrapper.text()).toContain(mockTask.description);
    expect(wrapper.text()).toContain('Status: TODO');
  });

  it('navigates to the edit page on click', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
    });

    await wrapper.trigger('click');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(router.push).toHaveBeenCalledWith(`/edit/${mockTask._id}`);
  });

  it('deletes the task when delete button is clicked', async () => {
    const taskStore = useTaskStore();
    vi.spyOn(taskStore, 'deleteTask').mockResolvedValue();

    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
    });

    await wrapper.find('button').trigger('click');
    expect(taskStore.deleteTask).toHaveBeenCalledWith(mockTask._id);
  });
});
