require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');

const port = process.env.PORT || 3005;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL and Key must be set in the .env file");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Conexão com Supabase configurada!");

app.use(cors());
app.use(express.json());

//rota front end 
const pastaFrontend = path.join(__dirname, "../frontend");

app.use(express.static(pastaFrontend));

app.get("/", (req, res) => {
    res.sendFile(path.join(pastaFrontend, "login.html"));
});


//CADASTRO DE PACIENTE
app.post('/api/cadastro', async (req, res) => {
    // Captura os dados que vieram do fetch
    const {nome, email, senha, celular } = req.body;

    // Insere os dados na tabela do Supabase
    const { error } = await supabase 
        .from('pacientecadastro')
        .insert([{  
            email: email, 
            nome: nome,
            senha: senha, 
            celular: celular 
        }]);

    // Se o Supabase reclamar de algo, devolve o erro
    if (error) {
        return res.status(400).json({ erro: "Erro ao cadastrar: " + error.message });
    }


    return res.status(201).json({
        mensagem: 'Cadastro realizado com sucesso'
    });
});


app.post('/api/login', async (req, res) => {
    // Captura email e senha enviados pelo frontend
    const { email, senha } = req.body;

    // Procura usuário no Supabase
    const { data, error } = await supabase
        .from('pacientecadastro')
        .select('*')
        .eq('email', email)
        .eq('senha', senha)
        .single();

    // Se der erro ou não encontrar usuário
    if (error || !data) {
        return res.status(401).json({
            erro: 'Email ou senha inválidos'
        });
    }

    // Login realizado com sucesso
    res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        usuario: {
            id: data.id,
            email: data.email,
            celular: data.celular
        }
    });
});


app.get('/api/pacientes', async (req, res) => {
    // Equivalente a: SELECT * FROM pacientes
    const { data, error } = await supabase
        .from('pacientecadastro') 
        .select('*');

    if (error) {
        return res.status(400).json({ erro: error.message });
    }

    res.status(200).json(data);
});




app.listen(port, () => console.log(`Server running at http://localhost:${port}`));