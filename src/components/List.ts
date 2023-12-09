import { Todo ,TodoListElement,TodoItemElement } from "../types"

const TEMPLATE = '<ul class="todo-list"></ul>'

export const EVENTS = {
  DELETE_ITEM: 'DELETE_ITEM'
}

export default class List extends HTMLElement {
  itemTemplate: HTMLTemplateElement
  list: TodoListElement

  static get observedAttributes () {
    return ['todos']
  }

  get todos () {
    if(!this.hasAttribute('todos')) {
      return []
    }

    return JSON.parse(this.getAttribute('todos'))
  }

  set todos (value) {
    this.setAttribute('todos', JSON.stringify(value))
  }

  onDeleteClick (index:number) {
    const event = new CustomEvent(
      EVENTS.DELETE_ITEM,
      {
        detail:{
          index
        }
      }
    )

    this.dispatchEvent(event)
  }

  createNewTodoNode () {
    return this.itemTemplate.content.firstElementChild.cloneNode(true) as TodoItemElement
  }

  getTodoElement (todo:Todo, index:number) {
    const {
      text, completed
    } = todo

    const element = this.createNewTodoNode()

    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text

    if(completed) {
      element.classList.add('completed')
      element.querySelector('input.toggle').checked = true
    }

    element.querySelector('button.destroy').dataset.index = String(index)

    return element
  }

  updateList () {
    this.list.innerHTML = ''
    
    this.todos.map((todo:Todo, index:number) => this.getTodoElement(todo, index)).forEach((element) => {
      this.list.appendChild(element)
    })
  }

  connectedCallback () {
    this.innerHTML = TEMPLATE
    this.itemTemplate = document.getElementById('todo-item') as HTMLTemplateElement
    this.list = this.querySelector('ul')

    this.list.addEventListener('click', e => {
      const target = e.target as HTMLElement;

      if(target.matches('button.destroy')) {
        this.onDeleteClick(Number(target.dataset.index))
      }
    })

    this.updateList()
  }

  attributeChangedCallback () {
    this.updateList()
  }
}