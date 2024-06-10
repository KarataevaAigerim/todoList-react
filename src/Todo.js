import React, { useState } from 'react';
import './/App.css'; 

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [taskType, setTaskType] = useState('');
    const [userName, setUserName] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (!taskInput.trim() || !taskType) return;
        const newTask = {
            id: tasks.length + 1,
            name: taskInput,
            type: taskType,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setTaskInput('');
        setTaskType('');
    };

    const toggleTask = (id) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };



    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id, newName) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, name: newName } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="todo">
            <div className="todo__heading--greeting">
                <h1 className="todo__heading">Hello, 
                <input
                    className="todo__input"
                    type='text'
                    placeholder="Name here"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                </h1>
            </div>
            <p className="todo__comment">What's on your to do list?</p>
            <form onSubmit={addTask}>
                <input className="task__input" type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder=" " required />
                <p className="todo__comment">Pick a category</p>
                <div className="todo__category--boxes">
                    <label className="todo__label todo__label--personal">
                        <input className="radio-btn" type="radio" name="type" value="personal" onChange={() => setTaskType('personal')} checked={taskType === 'personal'} /> Personal
                    </label>
                    <label className="todo__label todo__label--business">
                        <input className="radio-btn" type="radio" name="type" value="business" onChange={() => setTaskType('business')} checked={taskType === 'business'} /> Business
                    </label>
                </div>
                <button type="submit" className="btn btn-flat">Add Todo</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={`todo__task todo__task--${task.type} ${task.completed ? 'completed' : ''}`}>
                        <div className="todo__task-items">
                            <input type="radio" checked={task.completed} onChange={() => toggleTask(task.id)} />
                            <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
                        </div>
                        <div className="todo__task-btns">
                            <button className="edit-btn"onClick={() => editTask(task.id, prompt('Edit task', task.name))}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;