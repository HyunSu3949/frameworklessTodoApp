import { Events, AppState } from './types.js'

import appView from './view/app'
import counterView from './view/counter'
import applyDiff from './applyDiff'
import todosView from './view/todos'
import filtersView from './view/filters'

import registry from './registry'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state:AppState = {
  todos: [],
  currentFilter: 'All'
}

const events:Events = {
  deleteItem: (index) => {
    state.todos.splice(index, 1)
    render()
  },
  addItem: text => {
    state.todos.push({
      text,
      completed: false
    })
    render()
  }
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')

    if(!(main instanceof HTMLElement)){
      throw new Error ('main의 아이디가 올바른지 확인하세요.')
    }

    const newMain = registry.renderRoot(
      main,
      state,
      events)
    console.log(newMain);
    
    applyDiff(document.body, main, newMain)
  })
}

render()
