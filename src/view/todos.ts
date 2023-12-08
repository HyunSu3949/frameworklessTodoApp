import { ComponentFunction, Events, Todo, TodoElement } from "../types";

const createNewTodoNode = () => {
  const template = document.getElementById('todo-item');

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error('todo-item 아이디가 맞는지 확인하세요');
  }

  const clonedNode = template.content.firstElementChild?.cloneNode(true);

  if (!clonedNode) {
    throw new Error('Template 의 자식 요소가 없습니다');
  }

  return clonedNode as TodoElement;
}

const getTodoElement = (todo: Todo, index: number, events: Events) => {
  const {
    text,
    completed
  } = todo

  const element = createNewTodoNode()

  element.querySelector('input.edit').value = text
  element.querySelector('label').textContent = text

  if (completed) {
    element.classList.add('completed')
    element
      .querySelector('input.toggle')
      .checked = true
  }

  element.querySelector('button.destroy').dataset.index = String(index);

  return element
}

const todosView: ComponentFunction = (targetElement, state, events) => {
  const { deleteItem } = events
  const { todos } = state

  const newTodoList = targetElement.cloneNode(true) as HTMLElement

  newTodoList.innerHTML = ''

  todos
    .map((todo:Todo, index:number) => getTodoElement(todo, index, events))
    .forEach((element:TodoElement) => {
      newTodoList.appendChild(element)
    })
  
  newTodoList.addEventListener('click', (e: MouseEvent)=> {
    const target = e.target as HTMLElement;
    if(target.matches('button.destroy')) {
      deleteItem(target.dataset.index)
    }
  })
  return newTodoList
}

export default todosView
