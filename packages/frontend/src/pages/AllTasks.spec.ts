import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AllTasks from './AllTasks.vue';
import TaskItem from '../components/TaskItem.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useTaskStore } from '../store/tasks';
import { useRouter } from 'vue-router';
import { TaskStatus } from '../types/task.ts';
import router from '../router';

vi.mock('vue-router');
vi.mocked(useRouter).mockReturnValue({
  ...router,
  push: vi.fn()
});

describe('AllTasks.vue', () => {
  let taskStore: ReturnType<typeof useTaskStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    taskStore = useTaskStore();
    vi.spyOn(taskStore, 'fetchTasks').mockResolvedValue();
  });

  const mountComponent = async () => {
    const wrapper = mount(AllTasks);
    await flushPromises();
    return wrapper;
  };

  it('renders TaskItem components when tasks are loaded', async () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', description: 'Task 1', status: TaskStatus.TODO },
      { _id: '2', title: 'Task 2', description: 'Task 2', status: TaskStatus.TODO },
    ];
    taskStore.tasks = mockTasks;

    const wrapper = await mountComponent();

    expect(wrapper.findAllComponents(TaskItem)).toHaveLength(mockTasks.length);
    expect(wrapper.find('button').isVisible()).toBe(true);
  });

  it('displays a "No tasks available" message when no tasks are present', async () => {
    taskStore.tasks = [];

    const wrapper = await mountComponent();

    expect(wrapper.text()).toContain('No tasks available. Start by creating a new task!');
    expect(wrapper.find('button').isVisible()).toBe(true);
  });

  it('navigates to create task page when the "Create Task" button is clicked', async () => {
    const wrapper = await mountComponent();

    await wrapper.find('button').trigger('click');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(useRouter().push).toHaveBeenCalledWith('/create');
  });
});
