import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TaskForm from '../components/TaskForm.vue';
import { TaskStatus, type Task } from '../types/task';

describe('TaskForm.vue', () => {
  it('renders the form with empty fields by default', () => {
    const wrapper = mount(TaskForm);

    const titleInput = wrapper.find('input#title').element as HTMLInputElement;
    expect(titleInput.value).toBe('');

    const descriptionTextarea = wrapper.find('textarea#description').element as HTMLTextAreaElement;
    expect(descriptionTextarea.value).toBe('');

    const status = wrapper.find('select#status').element as HTMLTextAreaElement;
    expect(status.value).toBe(TaskStatus.TODO);
  });

  it('populates the form when task prop is provided', () => {
    const task: Task = {
      _id: '1',
      title: 'Test Task',
      description: 'This is a test task',
      status: TaskStatus.IN_PROGRESS,
    };

    const wrapper = mount(TaskForm, {
      props: { task },
    });

    const titleInput = wrapper.find('input#title').element as HTMLInputElement;
    expect(titleInput.value).toBe(task.title);

    const descriptionTextarea = wrapper.find('textarea#description').element as HTMLTextAreaElement;
    expect(descriptionTextarea.value).toBe(task.description);

    const status = wrapper.find('select#status').element as HTMLTextAreaElement;
    expect(status.value).toBe(task.status);
  });

  it('validates form before submission', async () => {
    const wrapper = mount(TaskForm);

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain(' must be between 3 and 50 characters');
    expect(wrapper.text()).toContain(' must be between 5 and 255 characters');
  });

  it('emits task-submit event when form is valid', async () => {
    const wrapper = mount(TaskForm);

    await wrapper.find('input#title').setValue('Valid Title');
    await wrapper.find('textarea#description').setValue('Valid description for the task.');
    await wrapper.find('select#status').setValue(TaskStatus.DONE);

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('task-submit')).toBeTruthy();
    expect(wrapper.emitted('task-submit')?.[0][0]).toEqual({
      title: 'Valid Title',
      description: 'Valid description for the task.',
      status: TaskStatus.DONE,
    });
  });
});
