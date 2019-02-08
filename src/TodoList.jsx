import React, { Component } from 'react';
import Todo                 from './Todo';

class TodoList extends Component {
  render() {
    const { todos, removeTodo, toggleTodo } = this.props;
    const elements = todos.map((todo) => (
      <Todo todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            key={todo.id} />
    ));
    return (
      <div className="TodoList">
        {elements}
      </div>
    );
  }
}

export default TodoList;