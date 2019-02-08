import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    const { todo, toggleTodo } = this.props;

    return (
      <div className="todo">
        <input type="checkbox"
               className="todo-check"
               checked={ todo.completed }
               onChange={() => toggleTodo(todo.id)}/>
        <span className={ todo.completed ? 'todo-completed todo-text' : 'todo-text' }>{todo.text}</span>
      </div>
    );
  }
}

export default Todo;