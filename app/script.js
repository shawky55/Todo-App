'use strict';
//two main section
const TOP_SIDE = document.querySelector('.top-side');
///

//Theme control
const THEME_CONTROL = document.querySelector('.top-side .theme-control');
const sunIcon = THEME_CONTROL.querySelector('.sun-icon');
const moonIcon = THEME_CONTROL.querySelector('.moon-icon');
const mybode = document.querySelector('body');

//Form
const TODO_INPUT = document.getElementById('todoInput');
const FORM = document.querySelector('.top-side form');

//Todo list

const todoUl = document.querySelector('ul');

const TODO_LIST = document.querySelector('.bottom-side .todo-list');
const INFO = document.querySelector('.bottom-side .info');
const MOBILE_VIEW = document.querySelector('.bottom-side .mobile-view');

//Buttons Desktop
const COMPLETE_BTN = document.querySelector('.completed-button');
const ALL_BTN = document.querySelector('.all-button');
const CLEAR_COMPLETED_BTN = document.querySelector('.clear-button');
const ACTIVE_BTN = document.querySelector('.Active-button');

///Buttons mobile view
const ALL_MOBILE_BTN = document.querySelector('.all-mobile-btn');
const ACTIVE_MOBILE_BTN = document.querySelector('.active-mobile-btn');
const COMPLETED_MOBILE_BTN = document.querySelector('.completed-mobile-btn');

let liCounter = 0;
const emptyValue = '';
TODO_INPUT.focus();
///
const modeToggle = () => {
  sunIcon.classList.toggle('hidden');
  moonIcon.classList.toggle('hidden');
  TOP_SIDE.classList.toggle('top-light-background');
  FORM.classList.toggle('light-mode-bg');
  TODO_LIST.classList.toggle('light-mode-bg');
  mybode.classList.toggle('bottom-dark-background');
  INFO.classList.toggle('light-mode-bg');
  MOBILE_VIEW?.classList.toggle('light-mode-bg');
};

const insertTodo = (e) => {
  let todo = TODO_INPUT.value;
  if (todo == emptyValue) return;
  let node = document.createElement('li');
  node.classList.add('notCompleted');
  node.id = `${++liCounter}`;
  node.innerHTML = `
                <div class="checkBox">
                    <img
                      src="images/icon-check.svg"
                      
                      class="check-icon op"
                      style="margin: 0px 2px"
                      alt="check-icon"
                    />
                  </div>
                  <div class="todo">${todo}</div>
                  <img src="images/icon-cross.svg" alt="cross-icon" class="crossIcon" />
                `;
  todoUl.prepend(node);

  TODO_INPUT.value = emptyValue;
  info();
};

const removeTodo = (e) => {
  if (e.target.className == 'crossIcon') {
    let selectedLI = e.target.closest('li');
    document.getElementById(selectedLI.id).remove();
  }
  info();
};

const info = () => {
  let todoNum = todoUl.children.length;
  // let completedTodo = document.getElementsByClassName('checkBoxSelected');
  // let notCompleted = document.getElementsByClassName('notCompleted');
  document.querySelector('.todo-counter span').textContent = todoNum;
  // document.getElementById('welcomMessage');
  if (todoUl.getElementsByTagName('li').length) {
    console.log(todoNum);
    document.querySelector('.message').classList.add('hidden');
  } else {
    document.querySelector('.message').classList.remove('hidden');
  }
};

const clearCompleted = (e) => {
  Array.from(todoUl.getElementsByClassName('missionCompleted')).forEach(
    (element) => {
      element.remove();
    }
  );
  info();
};

const AllTode = (e) => {
  Array.from(todoUl.children).forEach((element) => {
    element.classList.remove('hidden');
  });
  info();
};

const completedTodos = () => {
  Array.from(todoUl.children).forEach((element) => {
    if (element.classList.contains('notCompleted')) {
      element.classList.toggle('hidden');
    }
  });
  info();
};

const ActiveTodo = (e) => {
  Array.from(todoUl.children).forEach((element) => {
    if (element.classList.contains('missionCompleted')) {
      element.classList.add('hidden');
    } else {
      element.classList.remove('hidden');
    }
  });
  info();
};

const selectTodos = (e) => {
  if (e.target.classList.contains('check-icon')) {
    let li = e.target.closest('li');
    let checkBox = e.target.closest('.checkBox');
    let icon = e.target;
    li.classList.toggle('missionCompleted');
    li.classList.toggle('notCompleted');
    icon.classList.toggle('op');
    checkBox.classList.toggle('checkBoxSelected');
  }
  info(); //get new updates
};
///
FORM.addEventListener('submit', function (e) {
  e.preventDefault();
});

TODO_INPUT.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    insertTodo(e);
  }
});
///
INFO.addEventListener('click', function (e) {
  console.log(e.target.tagName);
  if (e.target.tagName == 'SMALL') {
    INFO.querySelectorAll('small').forEach((btn) => {
      btn.classList.remove('Active');
      console.log('removed');
    });
    e.target.classList.add('Active');
  }
});

TODO_INPUT.addEventListener('blur', insertTodo);

THEME_CONTROL.addEventListener('click', modeToggle);

TODO_LIST.addEventListener('click', removeTodo);

todoUl.addEventListener('click', selectTodos);

CLEAR_COMPLETED_BTN.addEventListener('click', clearCompleted);
ALL_BTN.addEventListener('click', AllTode);
ACTIVE_BTN.addEventListener('click', ActiveTodo);
COMPLETE_BTN.addEventListener('click', completedTodos);

ALL_MOBILE_BTN.addEventListener('click', AllTode);
COMPLETED_MOBILE_BTN.addEventListener('click', completedTodos);
ACTIVE_MOBILE_BTN.addEventListener('click', ActiveTodo);
