import type { Events, ComponentFunction } from "../types";

const getTemplate = () => {
  const template = document.getElementById('todo-app');
  
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error('todo-item 아이디가 맞는지 확인하세요');
  }

  const clonedNode = template.content.firstElementChild?.cloneNode(true);

  if (!clonedNode) {
    throw new Error('Template 의 자식 요소가 없습니다');
  }

  return clonedNode as HTMLElement;
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