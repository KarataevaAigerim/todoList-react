import React, { useState } from 'react';
// import './styles.css'; // Make sure to have your styles set up

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [taskType, setTaskType] = useState('');

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
                <h1 className="todo__heading">What's up,</h1>
                {/* Input for user's name is not handled for state as it's not specified in your code */}
                <input className="todo__input" type='text' placeholder=" Name here" />
            </div>
            <h3 className="todo__subheading">Create a todo</h3>
            <p className="todo__comment">What's on your to do list?</p>
            <form onSubmit={addTask}>
                <input type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="e.g. do your homework" required />
                <p className="todo__comment">Pick a category</p>
                <div className="todo__category--boxes">
                    <label className="todo__label--personal">
                        <input type="radio" name="type" value="personal" onChange={() => setTaskType('personal')} checked={taskType === 'personal'} /> Personal
                    </label>
                    <label className="todo__label--business">
                        <input type="radio" name="type" value="business" onChange={() => setTaskType('business')} checked={taskType === 'business'} /> Business
                    </label>
                </div>
                <button type="submit" className="btn btn-flat">Add Todo</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={`todo__task todo__task--${task.type} ${task.completed ? 'completed' : ''}`}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                        <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => editTask(task.id, prompt('Edit task', task.name))}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;