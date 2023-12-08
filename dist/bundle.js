/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/applyDiff.ts":
/*!**************************!*\
  !*** ./src/applyDiff.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar isNodeChanged = function (node1, node2) {\n  var n1Attributes = node1.attributes;\n  var n2Attributes = node2.attributes;\n  if (n1Attributes.length !== n2Attributes.length) {\n    return true;\n  }\n  var differentAttribute = Array.from(n1Attributes).find(function (attribute) {\n    var name = attribute.name;\n    var attribute1 = node1.getAttribute(name);\n    var attribute2 = node2.getAttribute(name);\n    return attribute1 !== attribute2;\n  });\n  if (differentAttribute) {\n    return true;\n  }\n  if (node1.children.length === 0 && node2.children.length === 0 && node1.textContent !== node2.textContent) {\n    return true;\n  }\n  return false;\n};\nvar applyDiff = function (parentNode, realNode, virtualNode) {\n  if (realNode && !virtualNode) {\n    realNode.remove();\n    return;\n  }\n  if (!realNode && virtualNode) {\n    parentNode.appendChild(virtualNode);\n    return;\n  }\n  if (isNodeChanged(virtualNode, realNode)) {\n    realNode.replaceWith(virtualNode);\n    return;\n  }\n  var realChildren = Array.from(realNode.children);\n  var virtualChildren = Array.from(virtualNode.children);\n  var max = Math.max(realChildren.length, virtualChildren.length);\n  for (var i = 0; i < max; i++) {\n    applyDiff(realNode, realChildren[i], virtualChildren[i]);\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyDiff);\n\n//# sourceURL=webpack://myapp/./src/applyDiff.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/app */ \"./src/view/app.ts\");\n/* harmony import */ var _view_counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/counter */ \"./src/view/counter.ts\");\n/* harmony import */ var _applyDiff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applyDiff */ \"./src/applyDiff.ts\");\n/* harmony import */ var _view_todos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/todos */ \"./src/view/todos.ts\");\n/* harmony import */ var _view_filters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/filters */ \"./src/view/filters.ts\");\n/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registry */ \"./src/registry.ts\");\n\n\n\n\n\n\n_registry__WEBPACK_IMPORTED_MODULE_5__[\"default\"].add('app', _view_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n_registry__WEBPACK_IMPORTED_MODULE_5__[\"default\"].add('todos', _view_todos__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n_registry__WEBPACK_IMPORTED_MODULE_5__[\"default\"].add('counter', _view_counter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n_registry__WEBPACK_IMPORTED_MODULE_5__[\"default\"].add('filters', _view_filters__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\nvar state = {\n  todos: [],\n  currentFilter: 'All'\n};\nvar events = {\n  deleteItem: function (index) {\n    state.todos.splice(index, 1);\n    render();\n  },\n  addItem: function (text) {\n    state.todos.push({\n      text: text,\n      completed: false\n    });\n    render();\n  }\n};\nvar render = function () {\n  window.requestAnimationFrame(function () {\n    var main = document.querySelector('#root');\n    if (!(main instanceof HTMLElement)) {\n      throw new Error('main의 아이디가 올바른지 확인하세요.');\n    }\n    var newMain = _registry__WEBPACK_IMPORTED_MODULE_5__[\"default\"].renderRoot(main, state, events);\n    console.log(newMain);\n    (0,_applyDiff__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(document.body, main, newMain);\n  });\n};\nrender();\n\n//# sourceURL=webpack://myapp/./src/index.ts?");

/***/ }),

/***/ "./src/registry.ts":
/*!*************************!*\
  !*** ./src/registry.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar registry = {};\nvar renderWrapper = function (component) {\n  return function (targetElement, state, events) {\n    var element = component(targetElement, state, events);\n    var childComponents = element.querySelectorAll('[data-component]');\n    console.log(childComponents);\n    Array.from(childComponents).forEach(function (target) {\n      var name = target.dataset.component;\n      if (!(name && name in registry)) {\n        throw new Error(\"Component '\".concat(name, \"' \\uC5D0 \\uD574\\uB2F9\\uD558\\uB294 \\uC774\\uB984\\uC774 \\uC5C6\\uC2B5\\uB2C8\\uB2E4.\"));\n      }\n      var child = registry[name];\n      if (!child) {\n        return;\n      }\n      target.replaceWith(child(target, state, events));\n    });\n    return element;\n  };\n};\nvar add = function (name, component) {\n  registry[name] = renderWrapper(component);\n};\nvar renderRoot = function (root, state, events) {\n  var cloneComponent = function (root) {\n    return root.cloneNode(true);\n  };\n  return renderWrapper(cloneComponent)(root, state, events);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  add: add,\n  renderRoot: renderRoot\n});\n\n//# sourceURL=webpack://myapp/./src/registry.ts?");

/***/ }),

/***/ "./src/view/app.ts":
/*!*************************!*\
  !*** ./src/view/app.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar getTemplate = function () {\n  var _a;\n  var template = document.getElementById('todo-app');\n  if (!(template instanceof HTMLTemplateElement)) {\n    throw new Error('todo-item 아이디가 맞는지 확인하세요');\n  }\n  var clonedNode = (_a = template.content.firstElementChild) === null || _a === void 0 ? void 0 : _a.cloneNode(true);\n  if (!clonedNode) {\n    throw new Error('Template 의 자식 요소가 없습니다');\n  }\n  return clonedNode;\n};\nvar addEvents = function (targetElement, events) {\n  var inputElement = targetElement.querySelector('.new-todo');\n  if (!(inputElement instanceof HTMLInputElement)) {\n    throw new Error('.new-todo 클래스를 가진 input 요소가 없습니다.');\n  }\n  var handleKeyPress = function (e) {\n    if (e.key === 'Enter') {\n      events.addItem(inputElement.value);\n      inputElement.value = '';\n    }\n  };\n  inputElement.addEventListener('keypress', handleKeyPress);\n};\nvar appView = function (targetElement, state, events) {\n  var newApp = targetElement.cloneNode(true);\n  newApp.innerHTML = '';\n  newApp.appendChild(getTemplate());\n  addEvents(newApp, events);\n  return newApp;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appView);\n\n//# sourceURL=webpack://myapp/./src/view/app.ts?");

/***/ }),

/***/ "./src/view/counter.ts":
/*!*****************************!*\
  !*** ./src/view/counter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar getTodoCount = function (todos) {\n  var notCompleted = todos.filter(function (todo) {\n    return !todo.completed;\n  });\n  var length = notCompleted.length;\n  if (length === 1) {\n    return '1 Item left';\n  }\n  return \"\".concat(length, \" Items left\");\n};\nvar counterView = function (targetElement, _a) {\n  var todos = _a.todos;\n  var newCounter = targetElement.cloneNode(true);\n  newCounter.textContent = getTodoCount(todos);\n  return newCounter;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (counterView);\n\n//# sourceURL=webpack://myapp/./src/view/counter.ts?");

/***/ }),

/***/ "./src/view/filters.ts":
/*!*****************************!*\
  !*** ./src/view/filters.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar filtersView = function (targetElement, _a) {\n  var currentFilter = _a.currentFilter;\n  var newCounter = targetElement.cloneNode(true);\n  Array.from(newCounter.querySelectorAll('li a')).forEach(function (a) {\n    if (a.textContent === currentFilter) {\n      a.classList.add('selected');\n    } else {\n      a.classList.remove('selected');\n    }\n  });\n  return newCounter;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filtersView);\n\n//# sourceURL=webpack://myapp/./src/view/filters.ts?");

/***/ }),

/***/ "./src/view/todos.ts":
/*!***************************!*\
  !*** ./src/view/todos.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar createNewTodoNode = function () {\n  var _a;\n  var template = document.getElementById('todo-item');\n  if (!(template instanceof HTMLTemplateElement)) {\n    throw new Error('todo-item 아이디가 맞는지 확인하세요');\n  }\n  var clonedNode = (_a = template.content.firstElementChild) === null || _a === void 0 ? void 0 : _a.cloneNode(true);\n  if (!clonedNode) {\n    throw new Error('Template 의 자식 요소가 없습니다');\n  }\n  return clonedNode;\n};\nvar getTodoElement = function (todo, index, events) {\n  var text = todo.text,\n    completed = todo.completed;\n  var element = createNewTodoNode();\n  element.querySelector('input.edit').value = text;\n  element.querySelector('label').textContent = text;\n  if (completed) {\n    element.classList.add('completed');\n    element.querySelector('input.toggle').checked = true;\n  }\n  element.querySelector('button.destroy').dataset.index = String(index);\n  return element;\n};\nvar todosView = function (targetElement, state, events) {\n  var deleteItem = events.deleteItem;\n  var todos = state.todos;\n  var newTodoList = targetElement.cloneNode(true);\n  newTodoList.innerHTML = '';\n  todos.map(function (todo, index) {\n    return getTodoElement(todo, index, events);\n  }).forEach(function (element) {\n    newTodoList.appendChild(element);\n  });\n  newTodoList.addEventListener('click', function (e) {\n    var target = e.target;\n    if (target.matches('button.destroy')) {\n      deleteItem(target.dataset.index);\n    }\n  });\n  return newTodoList;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todosView);\n\n//# sourceURL=webpack://myapp/./src/view/todos.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;