const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'sua_chave_secreta_super_segura'; // Em um app real, use variáveis de ambiente

// --- Middlewares Essenciais ---
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(bodyParser.json()); // Habilita o parsing de JSON no corpo das requisições

// --- Simulação de um Banco de Dados (em memória) ---
// Em uma aplicação real, isso estaria em um banco de dados como PostgreSQL, MongoDB, etc.
let users = [
    { id: 1, username: 'usuario', password: '123' } // Credenciais para teste
];

let todos = [
    { id: 1, text: 'Aprender Node.js', completed: false, userId: 1 },
    { id: 2, text: 'Criar projeto React', completed: true, userId: 1 },
    { id: 3, text: 'Entender os 5 Hooks', completed: false, userId: 1 },
];
let nextTodoId = 4;

// --- Middleware de Autenticação ---
// Este middleware vai proteger nossas rotas. Ele verifica se o token enviado é válido.
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401); // 401 Unauthorized: Não autorizado se não houver token
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // 403 Forbidden: Proibido se o token for inválido/expirado
        }
        req.user = user; // Adiciona os dados do usuário (ex: id) na requisição
        next(); // Passa para a próxima função (a rota em si)
    });
};


// --- Rota de Login (Pública) ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Se o usuário existir, gera um token de acesso
        const accessToken = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(400).send('Usuário ou senha inválidos');
    }
});

// --- Rotas da API To-Do (Protegidas pelo Middleware) ---

// GET /todos: Obter todas as tarefas do usuário logado
app.get('/todos', authenticateToken, (req, res) => {
    // Filtra as tarefas para retornar apenas as do usuário que fez a requisição
    res.json(todos.filter(todo => todo.userId === req.user.id));
});

// POST /todos: Adicionar uma nova tarefa
app.post('/todos', authenticateToken, (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('O texto da tarefa é obrigatório.');
    }
    const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        userId: req.user.id
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id: Atualizar uma tarefa (marcar como completa/incompleta)
app.put('/todos/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id && t.userId === req.user.id);

    if (todo) {
        todo.completed = !todo.completed;
        res.json(todo);
    } else {
        res.status(404).send('Tarefa não encontrada');
    }
});

// DELETE /todos/:id: Deletar uma tarefa
app.delete('/todos/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id == id && t.userId === req.user.id);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        res.status(204).send(); // 204 No Content: Sucesso, sem conteúdo para retornar
    } else {
        res.status(404).send('Tarefa não encontrada');
    }
});


// --- Inicia o Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log('Você pode acessar as rotas em http://localhost:5000');
});