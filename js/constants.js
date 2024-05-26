export const TODO_LIST_KEY = 'todo list';
export const FILTER_ACTION_KEY = 'filter_action';
export const todoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) ?? [];
export const selectors = {
  form: document.querySelector('.js-add-task'),
  list: document.querySelector('.js-list'),
  filters: document.querySelector('.js-options-status'),
};
