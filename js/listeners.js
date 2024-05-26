import { setDone, removeItem, createMarkUp, filteredList } from './functions';
import {
  TODO_LIST_KEY,
  FILTER_ACTION_KEY,
  todoList,
  selectors,
} from './constants';

function handleSubmit(evt) {
  evt.preventDefault();

  const obj = {};
  new FormData(evt.currentTarget).forEach((value, key) => (obj[key] = value));

  obj.id = Date.now();
  todoList.push(obj);
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  selectors.list.innerHTML = createMarkUp(todoList);
  evt.currentTarget.reset();
}

function clickFilterHandler(evt) {
  const { target } = evt;
  const { action } = target.dataset;
  localStorage.setItem(FILTER_ACTION_KEY, action);
  selectors.list.innerHTML = createMarkUp(filteredList());
}

function handleListClick(evt) {
  const { target } = evt;
  const { id } = target.closest('.js-task').dataset;
  if (target.classList.contains('js-done')) {
    setDone(id, target);
  } else if (target.classList.contains('js-remove')) {
    removeItem(id);
  }
}

export { handleSubmit, clickFilterHandler, handleListClick };
