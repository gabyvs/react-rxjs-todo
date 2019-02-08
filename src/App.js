import React, { Component } from 'react';
import { Subject }          from 'rxjs';
import './App.css';
import AddTodo              from './AddTodo';
import TodoList             from './TodoList';

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

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
    this.store.subscribe(
      state => this.setState(state)
    );
  }

  addTodo = (text) => {
    const newState = {
      todos: [...this.state.todos, {
        completed: false,
        text,
        id: new Date()
      }]
    };
    this.store.next(newState);
  };

  removeTodo = (id) => {
    this.store.next({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  };

  toggleTodo = (id) => {
    this.store.next({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        return todo;
      })
    });
  };

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
