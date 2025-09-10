📝 Aplicação To-Do List Full Stack
Uma aplicação web completa de lista de tarefas (To-Do List) desenvolvida para solidificar e demonstrar conceitos fundamentais do desenvolvimento Full Stack moderno, utilizando React no frontend e Node.js com Express no backend.

🚀 Sobre o Projeto
Este projeto consiste numa interface de cliente (frontend) reativa construída com React e numa API RESTful (backend) construída com Node.js e Express. A aplicação permite que utilizadores se autentiquem e giram as suas próprias listas de tarefas, com funcionalidades de criar, ler, atualizar e apagar (CRUD).

O principal objetivo foi aplicar e conectar de forma prática um conjunto de tecnologias e conceitos essenciais do ecossistema JavaScript, desde a criação da interface até à lógica do servidor e autenticação.

✨ Funcionalidades
🔐 Autenticação de Utilizadores: Sistema de login seguro utilizando JSON Web Token (JWT).
📋 Gestão de Tarefas: Funcionalidades completas de CRUD (Criar, Ler, Atualizar, Apagar) para as tarefas.
⚡ Interface Reativa: Experiência de utilizador fluida e sem recarregamentos de página, graças ao React.
🛡️ Rotas Protegidas: Apenas utilizadores autenticados podem aceder à sua lista de tarefas.
🔄 Atualização em Tempo Real: O estado da aplicação é atualizado instantaneamente após cada ação.
🧠 Conceitos Praticados

Este projeto foi uma oportunidade para exercitar os seguintes conceitos:

Frontend (React)
Componentização: Criação de componentes com e sem estado (Stateful/Stateless).
Hooks Essenciais: Aplicação prática dos 5 principais Hooks:
useState: Gestão de estado local.
useEffect: Ciclo de vida e efeitos colaterais (como requisições a APIs).
useContext: Gestão de estado global (autenticação).
useRef: Acesso direto a elementos do DOM.
useCallback e useMemo: Otimização de performance.
Listas e Chaves: Renderização eficiente de listas de dados.
Formulários Controlados: Gestão de inputs de formulário através do estado do React.
Navegação: Utilização do react-router-dom para criar uma navegação simples, alinhada e com rotas privadas.
Comunicação com API: Consumo de uma API RESTful utilizando axios.

Backend (Node.js)
API RESTful: Construção de uma API com Express.js seguindo os padrões REST.
Rotas e Middlewares: Estruturação de endpoints e criação de middlewares (ex: para autenticação).
Autenticação com JWT: Geração e validação de tokens para proteger rotas.
Simulação de Base de Dados: Uso de arrays em memória para simular a persistência de dados.

🛠️ Tecnologias Utilizadas
O projeto foi construído com as seguintes tecnologias:
FrontEnd:
React: A biblioteca principal para construir a interface de utilizador de forma reativa e componentizada.
React Router: Para gerir a navegação entre as páginas da aplicação (como ir do Login para a Home).
Axios: Para fazer as chamadas HTTP (requisições) para a API do backend, ou seja, para comunicar com o servidor.
BackEnd:
Node.js: O ambiente que permite executar JavaScript do lado do servidor.
Express.js: Um framework para Node.js que simplifica a criação da API, das rotas e da lógica do servidor.
JSON Web Token (JWT): Para criar um sistema de autenticação seguro, garantindo que apenas utilizadores logados possam aceder aos seus dados.

⚙️ Como Executar o Projeto Localmente
Siga os passos abaixo para executar a aplicação na sua máquina.

Pré-requisitos
Node.js (versão 18 ou superior recomendada)
npm (geralmente instalado com o Node.js)

Passos
Clone o repositório:
git clone [https://github.com/seu-utilizador/seu-repositorio.git](https://github.com/seu-utilizador/seu-repositorio.git)
Navegue até à pasta do projeto:
cd nome-do-repositorio

Instale as dependências do Backend:
cd backend
npm install

Instale as dependências do Frontend:

cd ../frontend
npm install

Executando a Aplicação
Para executar a aplicação, precisará de dois terminais abertos.
1. No Terminal 1 (inicie o Backend):

cd backend
node server.js

O terminal deverá exibir: Servidor backend rodando na porta 5000

2. No Terminal 2 (inicie o Frontend):

cd frontend
npm start

O seu navegador abrirá automaticamente em http://localhost:3000.

Credenciais para Teste
Use os seguintes dados para fazer login na aplicação:
User: usuario
Senha: 123
