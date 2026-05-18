// require("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");
// const express = require('express');
// const app = express();
// const path = require('path');

// const cors = require('cors');

// const port = process.env.PORT || 3005;

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//     console.error("Supabase URL and Key must be set in the .env file");
//     process.exit(1);
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("✅ Conexão com Supabase configurada!");

// app.use(cors());
// app.use(express.json());

// //rota front end 
// const pastaFrontend = path.join(__dirname, "../frontend");

// app.use(express.static(pastaFrontend));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(pastaFrontend, "login.html"));
// });


// //CADASTRO DE PACIENTE
// app.post('/api/cadastro', async (req, res) => {
//     // Captura os dados que vieram do fetch
//     const {nome, email, senha, celular } = req.body;

//     // Insere os dados na tabela do Supabase
//     const { error } = await supabase 
//         .from('pacientecadastro')
//         .insert([{  
//             email: email, 
//             nome: nome,
//             senha: senha, 
//             celular: celular 
//         }]);

//     // Se o Supabase reclamar de algo, devolve o erro
//     if (error) {
//         return res.status(400).json({ erro: "Erro ao cadastrar: " + error.message });
//     }


//     return res.status(201).json({
//         mensagem: 'Cadastro realizado com sucesso'
//     });
// });


// app.post('/api/login', async (req, res) => {
//     // Captura email e senha enviados pelo frontend
//     const { email, senha } = req.body;

//     // Procura usuário no Supabase
//     const { data, error } = await supabase
//         .from('pacientecadastro')
//         .select('*')
//         .eq('email', email)
//         .eq('senha', senha)
//         .single();

//     // Se der erro ou não encontrar usuário
//     if (error || !data) {
//         return res.status(401).json({
//             erro: 'Email ou senha inválidos'
//         });
//     }

//     // Login realizado com sucesso
//     res.status(200).json({
//         mensagem: 'Login realizado com sucesso',
//         usuario: {
//             id: data.id,
//             email: data.email,
//             celular: data.celular
//         }
//     });
// });


// app.get('/api/pacientes', async (req, res) => {
//     // Equivalente a: SELECT * FROM pacientes
//     const { data, error } = await supabase
//         .from('pacientecadastro') 
//         .select('*');

//     if (error) {
//         return res.status(400).json({ erro: error.message });
//     }

//     res.status(200).json(data);
// });




// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));








require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3005;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 🔴 MODIFICAÇÃO 1: Removido process.exit(1) para não quebrar o build na Vercel
if (!supabaseUrl || !supabaseKey) {
    console.error("⚠️ ERRO CRÍTICO: Supabase URL e Key precisam ser definidas no .env ou no painel da hospedagem!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Conexão com Supabase configurada!");

app.use(cors());
app.use(express.json());

// Rota frontend (Funciona localmente e no Render. Na Vercel, o vercel.json otimiza isso)
const pastaFrontend = path.join(__dirname, "../frontend");
app.use(express.static(pastaFrontend));

app.get("/", (req, res) => {
    res.sendFile(path.join(pastaFrontend, "login.html"));
});


// CADASTRO DE PACIENTE
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha, celular } = req.body;

    const { error } = await supabase 
        .from('pacientecadastro')
        .insert([{  
            email: email, 
            nome: nome,
            senha: senha, 
            celular: celular 
        }]);

    if (error) {
        return res.status(400).json({ erro: "Erro ao cadastrar: " + error.message });
    }

    return res.status(201).json({
        mensagem: 'Cadastro realizado com sucesso'
    });
});


// LOGIN DO PACIENTE
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    const { data, error } = await supabase
        .from('pacientecadastro')
        .select('*')
        .eq('email', email)
        .eq('senha', senha)
        .single();

    if (error || !data) {
        return res.status(401).json({
            erro: 'Email ou senha inválidos'
        });
    }

    res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        usuario: {
            id: data.id,
            email: data.email,
            celular: data.celular
        }
    });
});


// LISTAGEM DE PACIENTES
app.get('/api/pacientes', async (req, res) => {
    const { data, error } = await supabase
        .from('pacientecadastro') 
        .select('*');

    if (error) {
        return res.status(400).json({ erro: error.message });
    }

    res.status(200).json(data);
});


// 🔴 MODIFICAÇÃO 2: Só ativa o servidor contínuo se NÃO estiver na Vercel (Essencial para o Render)
if (!process.env.VERCEL) {
    app.listen(port, () => console.log(`🚀 Servidor ativo e rodando na porta ${port}`));
}

// 🔴 MODIFICAÇÃO 3: Exporta o app (Exigido pela Vercel como Serverless, ignorado pelo Render)
module.exports = app;