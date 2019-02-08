import React, { Component } from 'react';
import { Subject }          from 'rxjs';
import {scan} from 'rxjs/operators';
import './App.css';
import AddTodo              from './AddTodo';
import TodoList             from './TodoList';

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

class App extends Component {
  state = {
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

  store = new Subject();

  componentDidMount () {
    this.store
      .pipe(scan((acc, f) => f(acc), this.state))
      .subscribe(
        state => this.setState(state)
      );
  }

  addTodo = text => this.store.next(addTodo(text));
  removeTodo = id => this.store.next(removeTodo(id));
  toggleTodo = id => this.store.next(toggleTodo(id));

  render() {
    return (
      <div className='App'>
        <AddTodo addTodo={this.addTodo}/>
        <TodoList
          todos={this.state.todos}
          removeTodo={this.removeTodo}
          toggleTodo={this.toggleTodo}/>
      </div>
    );
  }
}

export default App;
