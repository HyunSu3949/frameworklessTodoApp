import type { Todos, ComponentFunction } from "../types"

const getTodoCount = (todos:Todos) => {
  const notCompleted = todos
    .filter(todo => !todo.completed)

  const { length } = notCompleted
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

const counterView: ComponentFunction = (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodoCount(todos);
  return newCounter as HTMLElement;
};

export default counterView;