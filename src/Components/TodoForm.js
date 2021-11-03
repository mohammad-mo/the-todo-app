import React, { useState, useEffect, useRef } from 'react'

const TodoForm = (props) => 
{
  const [input, setInput] = useState(props.edit ? props.edit.value : '')

  const inputRef = useRef(null)

  useEffect(() =>
  {
    inputRef.current.focus()
  }, [])

  const changeHandler = (event) =>
  {
      setInput(event.target.value)
  }

  const submitHandler = (event) =>
  {
      event.preventDefault()
      props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input,
      })
      setInput('')
  }

  return (
    <form className="todo-form" onSubmit={submitHandler}>
      {props.edit ? (
        <>
          <input
            ref={inputRef}
            className="todo-input edit"
            type="text"
            name="text"
            placeholder="Update your task"
            value={input}
            onChange={changeHandler}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
          <input
            ref={inputRef}
            className="todo-input"
            type="text"
            name="text"
            placeholder="Add a task"
            value={input}
            onChange={changeHandler}
          />
          <button className="todo-button">Add</button>
        </>
      )}
    </form>
  )
}

export default TodoForm
