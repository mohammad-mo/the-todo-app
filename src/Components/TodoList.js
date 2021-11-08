import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = () => 
{
    const [todos, setTodos] = useState([])

    useEffect(() =>
    {
        const json = localStorage.getItem('todos')
        const loadedTodos = JSON.parse(json)

        if (loadedTodos)
        {
            setTodos(loadedTodos)
        }
    }, [])

    useEffect(() =>
    {
        const json = JSON.stringify(todos)
        localStorage.setItem('todos', json)
    }, [todos])

    const addTodo = (todo) =>
    {
        if (!todo.text || /^\s*$/.test(todo.text))
        {
            return
        }

        const newTodos = [...todos, todo]
        setTodos(newTodos)
    }

    const updateTodoHandler = (todoId, newValue) =>
    {
        if (!newValue.text || /^\s*$/.test(newValue.text))
        {
            return
        }

        setTodos(prev => prev.map(item => item.id === todoId ? newValue : item))

    }

    const removeTodoHandler = (id) =>
    {
        const removeArray = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArray)
    }

    const completeTodoHandler = (id) =>
    {
        let updatedTodos = todos.map(todo =>
            {
                if (todo.id === id)
                {
                    todo.isComplete = !todo.isComplete
                }
                return todo
            })
        setTodos(updatedTodos)
    }

    return (
        <div>
            <h1>What's the plan for today?</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} completeTodo={completeTodoHandler} removeTodo={removeTodoHandler} updateTodo={updateTodoHandler}/>
        </div>
    )
}
 
export default TodoList