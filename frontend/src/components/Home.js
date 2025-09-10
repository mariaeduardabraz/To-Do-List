import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function Home() {
    const [todos, setTodos] = useState([]);
    const { token, logout } = useAuth();

    // useEffect para buscar as tarefas
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/todos', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTodos(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
                if (error.response && error.response.status === 401) logout();
            }
        };
        fetchTodos();
    }, [token, logout]);

    // useCallback para adicionar tarefa
    const addTodo = useCallback(async (text) => {
        try {
            const response = await axios.post('http://localhost:5000/todos',
                { text },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTodos(prevTodos => [...prevTodos, response.data]);
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    }, [token]);

    const toggleTodo = async (id) => {
        try {
            // 1. Faz a requisição para a API atualizar a tarefa no backend
            const response = await axios.put(`http://localhost:5000/todos/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 2. Atualiza o estado local para refletir a mudança na tela
            // O método .map() cria um novo array. Para cada 'todo', ele verifica:
            // - Se o ID bate com o que foi alterado, ele retorna a nova versão (que veio da API).
            // - Senão, ele retorna o 'todo' antigo sem modificação.
            setTodos(todos.map(todo => 
                todo.id === id ? response.data : todo
            ));
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            // 1. Faz a requisição para a API deletar a tarefa no backend
            await axios.delete(`http://localhost:5000/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 2. Atualiza o estado local para refletir a mudança na tela
            // O método .filter() cria um novo array contendo apenas os elementos
            // que passam no teste (neste caso, todos cujo ID seja DIFERENTE do deletado).
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    const todoCount = useMemo(() => {
        return todos.filter(todo => !todo.completed).length;
    }, [todos]);

    return (
        <div className="home-container">
            <header>
                <h1>Minha Lista de Tarefas</h1>
                <p>Você tem {todoCount} tarefa(s) pendente(s).</p>
                <button onClick={logout}>Sair</button>
            </header>
            <TodoForm addTodo={addTodo} />
            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo} // Passando a função completa
                        onDelete={deleteTodo} // Passando a função completa
                    />
                ))}
            </ul>
        </div>
    );
}

export default Home;