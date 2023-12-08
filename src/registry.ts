import type { Registry, ComponentFunction } from "./types"
const registry : Registry = {}

const renderWrapper = (component:ComponentFunction): ComponentFunction => {
  return (targetElement, state, events) => {
    const element = component(targetElement, state, events)

    const childComponents: NodeListOf<HTMLElement> = element
      .querySelectorAll('[data-component]')
    console.log(childComponents);
    
    Array
      .from(childComponents)
      .forEach((target) => {
        const name = target
          .dataset
          .component

         if (!(name && name in registry)) {
          throw new Error(`Component '${name}' 에 해당하는 이름이 없습니다.`);
        }

        const child = registry[name]
        if (!child) {
          return
        }

        target.replaceWith(child(target, state, events))
      })

    return element
  }
}

const add = (name:string, component: ComponentFunction) => {
  registry[name] = renderWrapper(component)
}

const renderRoot:ComponentFunction = (root, state, events) => {
  const cloneComponent = (root:HTMLElement) => {
    return root.cloneNode(true) as HTMLElement;
  }

  return renderWrapper(cloneComponent)(root, state, events)
}

export default {
  add,
  renderRoot
}
