import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span>{todo.text}</span>
            <div className="todo-buttons">
                <button onClick={() => onToggle(todo.id)}>
                    {todo.completed ? 'Reabrir' : 'Concluir'}
                </button>
                <button className="delete-btn" onClick={() => onDelete(todo.id)}>Deletar</button>
            </div>
        </li>
    );
}

export default React.memo(TodoItem); // React.memo é uma otimização para componentes sem estado