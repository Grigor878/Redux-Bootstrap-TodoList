import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'
import CompletedItems from './CompletedItems'

const Todo = () => {
    return (
        <div className='container'>
            <h1>My Todo List</h1>
            <AddTodoForm />
            <TodoList />
            <CompletedItems />
        </div>
    )
}

export default Todo