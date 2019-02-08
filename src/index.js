import React     from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import App       from './App';
import {Subject} from 'rxjs';
import {scan} from 'rxjs/operators';

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const addTodo = text => state => {
  return {
    ...state,
    todos: [...state.todos, {
      completed: false,
      text,
      id: new Date()
    }]
  };
};

const removeTodo = id => state => {
  return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id)
  };
};

const toggleTodo = id => state => {
  return {
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      return todo;
    })
  };
};

const initialState = {
  todos: [{
    completed: false,
    text: 'Finish app',
    id: new Date()
  }, {
    completed: true,
    text: 'Start app',
    id: yesterday
  }]
};

const store = new Subject();

store
  .pipe(scan((acc, f) => f(acc), initialState))
  .subscribe(
    state => ReactDOM.render(<App
      todos={state.todos}
      addTodo={text => store.next(addTodo(text))}
      removeTodo={id => store.next(removeTodo(id))}
      toggleTodo={id => store.next(toggleTodo(id))}/>, document.getElementById('root'))
  );

store.next(x => x);