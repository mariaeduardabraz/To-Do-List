import React, { useState, useRef, useEffect } from 'react';

function TodoForm({ addTodo }) {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus(); // Foca no elemento do DOM referenciado
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                ref={inputRef} // Associa a referência ao elemento input
                placeholder="O que precisa ser feito?"
            />
            <button type="submit">Adicionar</button>
        </form>
    );
}

export default TodoForm;