import React from 'react';
import { useDispatch } from 'react-redux'
import { toggleCompleteAsync, deleteTodosAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {

  const dispatch = useDispatch()

  const handleCompleteClick = () => {
    dispatch(
      toggleCompleteAsync({ id, completed: !completed }))
  }

  const handleDeleteClick = () => {
    if (!completed) {
      dispatch(deleteTodosAsync({ id }))
    }
  }

  // const handleEditClick = () => {
  //   dispatch(editTodo())
  // }

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className='d-flex justify-content-between'>
        <span className='d-flex align-items-center'>
          <input
            type='checkbox'
            style={{ 'cursor': 'pointer', 'marginRight': '11px' }}
            checked={completed}
            onChange={handleCompleteClick}
          />
          {title}
        </span>
        <div>
          {/* <button onClick={handleEditClick} className='btn btn-primary'>Edit</button> */}
          <button onClick={handleDeleteClick} className='btn btn-danger m-1'>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;