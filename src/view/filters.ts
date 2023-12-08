import { ComponentFunction } from "../types"

const filtersView : ComponentFunction = (targetElement, { currentFilter }) => {
  const newCounter = targetElement.cloneNode(true) as HTMLElement;
  
  Array
  .from(newCounter.querySelectorAll('li a'))
  .forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected')
    } else {
      a.classList.remove('selected')
    }
  })
  return newCounter
}

export default filtersView;
