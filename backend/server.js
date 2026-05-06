require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 5000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL and Key must be set in the .env file");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Conexão com Supabase configurada!");



//rota front end 

const pastaFrontend = path.join(__dirname, "../frontend");

app.use(express.static(pastaFrontend, { index: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(pastaFrontend, "login.html"));
});



app.post('/api/cadastro', async (req, res) => {
    // Captura os dados que vieram do fetch
    const { email, senha, celular } = req.body;

    // Insere os dados na tabela do Supabase
    const { error } = await supabase 
        .from('PacienteCadastro')
        .insert([{ 
            email: email, 
            senha: senha, 
            celular: celular // Adicionei o celular aqui para ele ser salvo!
        }]);

    // Se o Supabase reclamar de algo, devolve o erro
    if (error) {
        return res.status(400).json({ erro: "Erro ao cadastrar: " + error.message });
    }

    // Se deu tudo certo, devolve sucesso
    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
});


app.listen(port, () => console.log('Servidor rodando na porta  ' + port));