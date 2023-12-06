import type { Events, AppState, ComponentFunction } from "../types";


const getTemplate = () => {
  const templete = document.getElementById('todo-app');

  if (!(templete instanceof HTMLTemplateElement)) {
    throw new Error('todo-app 아이디가 맞는지 확인하세요');
  }

  return templete.content.firstElementChild?.cloneNode(true) as Node;
}

const addEvents = (targetElement: HTMLElement, events: Events) => {
  const inputElement = targetElement.querySelector('.new-todo');

  if (!(inputElement instanceof HTMLInputElement)) {
    throw new Error('.new-todo 클래스를 가진 input 요소가 없습니다.');
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      events.addItem(inputElement.value);
      inputElement.value = '';
    }
  };

  inputElement.addEventListener('keypress', handleKeyPress);
}

const appView: ComponentFunction = (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;

  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());
  addEvents(newApp, events);

  return newApp;
};

export default appView