export type Events = any
export type ComponentName = string
export type Registry = {[key in ComponentName]: any}

export type AppState = any;
export type ComponentFunction = (targetElement: HTMLElement, state: AppState, events: Events) => HTMLElement;


export type Todo = {text: string, completed:boolean};
export type Todos = Todo[]

export interface TodoItemElement extends HTMLElement {
  querySelector(selector: 'input.edit'): HTMLInputElement;
  querySelector(selector: 'input.toggle'): HTMLInputElement;
  querySelector(selector: 'label'): HTMLLabelElement;
  querySelector(selector: 'button.destroy'): HTMLButtonElement;
}

export interface TodoListElement extends HTMLElement {
  querySelector(selector: 'li'): TodoItemElement;

}