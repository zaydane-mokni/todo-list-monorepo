import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommendedTypeChecked,
  {
    rules: {
      // Vue.js
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/component-tags-order': ['error', {
        order: ['template', 'script', 'style']
      }],

      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // General
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    }
  }
);
