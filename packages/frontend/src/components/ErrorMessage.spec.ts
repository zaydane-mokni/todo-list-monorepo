import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './ErrorMessage.vue';

describe('MessageBox.vue', () => {
  it('renders message when passed', () => {
    const message = 'This is a test message';

    const wrapper = mount(ErrorMessage, {
      props: { message }
    });

    expect(wrapper.text()).toContain(message);
  });
});
