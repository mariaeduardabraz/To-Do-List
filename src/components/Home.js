import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function Home() {
    const [todos, setTodos] = useState([]); // useState: para a lista de tarefas
    const { token, logout } = useAuth();    // useContext: para autenticação

    // useEffect: busca os dados da API assim que o componente é montado
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/todos', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTodos(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
                if (error.response.status === 401) logout(); // Desloga se o token for inválido
            }
        };
        fetchTodos();
    }, [token, logout]); // Dependências: refaz o fetch se o token mudar

    // useCallback: Memoriza a função `addTodo`. Ela só será recriada se `token` mudar.
    // Isso otimiza a performance, evitando que o componente `TodoForm` renderize sem necessidade.
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
        // ... (código para marcar/desmarcar, igual ao da resposta anterior)
    };

    const deleteTodo = async (id) => {
        // ... (código para deletar, igual ao da resposta anterior)
    };

    // useMemo: Memoriza o resultado de uma computação.
    // A lista de `todos` só será re-renderizada se `todos` mudar.
    const todoCount = useMemo(() => {
        console.log("Calculando contagem de tarefas...");
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
                    <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                ))}
            </ul>
        </div>
    );
}

export default Home;