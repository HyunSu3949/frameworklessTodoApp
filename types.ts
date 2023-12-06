export type Events = any
export type ComponentName = string
export type Registry = {[key in ComponentName]: any}

export type AppState = any;
export type ComponentFunction = (targetElement: HTMLElement, state: AppState, events: Events) => HTMLElement;


export type Todo = {text: string, completed:boolean};
export type Todos = Todo[]

