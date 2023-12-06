import { Events, AppState } from './types.ts'

import appView from './view/app.ts'
import counterView from './view/counter.ts';
import applyDiff from './applyDiff.ts'

import registry from './registry.ts'

registry.add('app', appView)
registry.add('counter', counterView)

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

    applyDiff(document.body, main, newMain)
  })
}

render()
