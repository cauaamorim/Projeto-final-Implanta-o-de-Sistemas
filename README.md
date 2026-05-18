# Sistema de Cadastro de Pacientes

## Integrantes
- Cauã Amorim  
- Hugo Silva  
- Rodrigo da Cruz  

---

# Introdução

Este projeto consiste em um sistema web de cadastro e login de pacientes para uma clínica médica.

A aplicação foi desenvolvida utilizando:

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- PostgreSQL
- Supabase
- GitHub
- Vercel

O sistema permite:

- Cadastro de pacientes
- Login de usuários
- Listagem de pacientes cadastrados
- Integração completa com banco de dados PostgreSQL

---

# Tecnologias Utilizadas

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Banco de Dados
- PostgreSQL
- Supabase

## Controle de Versão
- Git
- GitHub

## Hospedagem
- Vercel

---

# Criação e Configuração do Banco de Dados PostgreSQL no Supabase

## Passo 1 — Criar Projeto no Supabase

Acesse:

https://supabase.com

Clique em:

```text
New Project
```

---

## Passo 2 — Configurar o Projeto

Defina:

- Nome do projeto  
Exemplo:

```text
clinica-medica
```

- Senha do banco
- Região do servidor

---

## Passo 3 — Provisionamento

Aguarde o Supabase finalizar a criação automática do banco PostgreSQL.

---

## Passo 4 — Copiar Credenciais

No painel do Supabase:

```text
Project Settings → API
```

Copie:

- Project URL
- Public API Key

Essas informações serão usadas no arquivo `.env`.

---

# Criação da Tabela de Pacientes

No Supabase, abra:

```text
SQL Editor
```

Execute o comando:

```sql
CREATE TABLE pacientecadastro (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    celular TEXT NOT NULL,
    senha TEXT NOT NULL
);
```

---

# Estrutura do Projeto

```bash
projeto-clinica/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── login.html
│   ├── cadastro.html
│   ├── home.html
│   ├── style.css
│   └── script.js
│
├── vercel.json
├── .gitignore
└── README.md
```

---

# Página de Cadastro

A página `cadastro.html` foi desenvolvida utilizando:

- HTML5
- CSS3
- Fonte Poppins
- Layout responsivo
- SVG animado

---

# Campos do Formulário

O sistema coleta:

- Nome
- E-mail
- Celular
- Senha

---

# Envio de Dados com JavaScript

O JavaScript:

- Captura o evento submit
- Valida os campos
- Converte os dados em JSON
- Envia para o backend

Exemplo:

```javascript
fetch('/api/cadastro', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome,
        email,
        celular,
        senha
    })
})
```

---

# Configuração do Backend

## Instalação das Dependências

```bash
npm install express cors dotenv @supabase/supabase-js
```

---

# Arquivo `.env`

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-publica
PORT=3100
```

---

# Configuração do Supabase

```javascript
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
```

---

# Rotas da API

## Cadastro

```javascript
app.post('/api/cadastro', async (req, res) => {

});
```

Inserção no banco:

```javascript
.from('pacientecadastro').insert()
```

---

## Login

```javascript
app.post('/api/login', async (req, res) => {

});
```

Validação:

```javascript
.from('pacientecadastro')
.select('*')
.eq()
```

---

## Listagem de Pacientes

```javascript
app.get('/api/pacientes', async (req, res) => {

});
```

Busca todos os pacientes cadastrados.

---

# Inicialização do Git

## Inicializar Repositório

```bash
git init
```

---

## Criar `.gitignore`

```gitignore
node_modules/
.env
```

---

## Adicionar Arquivos

```bash
git add .
```

---

## Primeiro Commit

```bash
git commit -m "Versão inicial do sistema de cadastro de pacientes"
```

---

# Envio para o GitHub

## Criar Repositório

Acesse:

https://github.com

Crie um novo repositório.

---

## Conectar Repositório Local

```bash
git remote add origin URL_DO_REPOSITORIO
```

---

## Configurar Branch Main

```bash
git branch -M main
```

---

## Enviar Projeto

```bash
git push -u origin main
```

---

# Deploy na Vercel

Acesse:

https://vercel.com

---

# Ajuste das Rotas Frontend

Troque URLs fixas por rotas relativas:

```javascript
fetch('/api/cadastro')
```

---

# Arquivo `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/",
      "dest": "/frontend/login.html"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

---

# Publicação na Vercel

## Passo 1 — Importar Projeto

Clique em:

```text
Add New Project
```

Importe o repositório do GitHub.

---

## Passo 2 — Variáveis de Ambiente

Na seção:

```text
Environment Variables
```

Adicione:

```env
SUPABASE_URL=
SUPABASE_KEY=
```

---

## Passo 3 — Deploy

Clique em:

```text
Deploy
```

Aguarde a publicação.

---

# Testes da Aplicação

## Teste de Cadastro

1. Abra a URL da Vercel
2. Vá para `cadastro.html`
3. Preencha os dados
4. Clique em “Cadastrar-se”

Resultado esperado:

- Cadastro realizado
- Redirecionamento para login

---

## Teste de Login

1. Abra `login.html`
2. Digite e-mail e senha
3. Clique em “Entrar”

Resultado esperado:

- Login realizado
- Redirecionamento para Home

---

## Teste de Listagem

Na página `home.html`:

```javascript
GET /api/pacientes
```

Resultado esperado:

- Tabela preenchida automaticamente

---

# Considerações Finais

O projeto atendeu aos requisitos propostos, permitindo:

- Cadastro de pacientes
- Login de usuários
- Integração com PostgreSQL
- Deploy em nuvem
- Controle de versão

O sistema demonstrou conhecimentos em:

- Desenvolvimento Web
- APIs REST
- Banco de Dados
- Supabase
- Git e GitHub
- Deploy na Vercel
- Integração Frontend e Backend
