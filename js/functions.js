import {
  TODO_LIST_KEY,
  FILTER_ACTION_KEY,
  todoList,
  selectors,
} from './constants';

function createMarkUp(arr) {
  return arr
    .map(
      ({ input, priority, id, done }) =>
        `<li class="js-task ${done ? 'mark-done' : ''}" data-id="${id}">
    <h2>${input}</h2>
    <h3>${priority}</h3>
    <div>
        ${done ? '' : '<button class="js-done">Mark Done</button>'}
        <button class="js-remove">Remove</button>
    </div>
  </li>`
    )
    .join('');
}

function setDone(id, el) {
  const index = todoList.findIndex(item => item.id === Number(id));
  todoList[index].done = 1;
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  el.closest('.js-task').classList.add('mark-done');
  selectors.list.innerHTML = createMarkUp(filteredList());
}

function removeItem(id) {
  const index = todoList.findIndex(item => item.id === Number(id));
  todoList.splice(index, 1);
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  selectors.list.innerHTML = createMarkUp(filteredList());
}

function filteredList() {
  let arr = todoList;
  const action = localStorage.getItem(FILTER_ACTION_KEY) ?? '';
  switch (action) {
    case 'progress':
      arr = todoList.filter(item => !item.done);
      break;
    case 'done':
      arr = todoList.filter(item => item.done);
      break;
    case 'hight':
    case 'low':
    case 'medium':
      arr = todoList.filter(item => item.priority === action);
      break;
  }
  return arr;
}

export { createMarkUp, setDone, removeItem, filteredList };
