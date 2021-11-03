import React, { useState } from 'react'

import FlipMove from 'react-flip-move'
import TodoForm from './TodoForm'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => 
{
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = (value) =>
    {
        updateTodo(edit.id, value)
        setEdit({
            id:null,
            value: ''
        })
    }

    if (edit.id)
    {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return (
      <FlipMove duration={300} easing='ease-in-out' appearAnimation='fade'>
        {todos.map((todo, index) => (
          <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
          >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
              {todo.text}
            </div>
            <div className="icons">
              <FaTrash
                className="delete-icon"
                onClick={() => removeTodo(todo.id)}
              />
              <FaEdit
                className="edit-icon"
                onClick={() => setEdit({ id: todo.id, value: todo.text })}
              />
            </div>
          </div>
        ))}
      </FlipMove>
    )
}
 
export default Todo