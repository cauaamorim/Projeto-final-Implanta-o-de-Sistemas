


require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// =========================================
// SUPABASE
// =========================================

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ SUPABASE_URL ou SUPABASE_KEY não configuradas");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Conexão com Supabase configurada!");

// =========================================
// MIDDLEWARES
// =========================================

app.use(cors());

app.use(express.json());

// =========================================
// FRONTEND
// =========================================

const pastaFrontend = path.join(__dirname, "..", "frontend");

app.use(express.static(pastaFrontend));

app.get("/", (req, res) => {
    res.sendFile(path.join(pastaFrontend, "login.html"));
});

// =========================================
// CADASTRO
// =========================================

app.post("/api/cadastro", async (req, res) => {

    try {

        const { nome, email, senha, celular } = req.body;

        const { error } = await supabase
            .from("pacientecadastro")
            .insert([
                {
                    nome,
                    email,
                    senha,
                    celular
                }
            ]);

        if (error) {
            return res.status(400).json({
                erro: "Erro ao cadastrar: " + error.message
            });
        }

        return res.status(201).json({
            mensagem: "Cadastro realizado com sucesso"
        });

    } catch (err) {

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });

    }

});

// =========================================
// LOGIN
// =========================================

app.post("/api/login", async (req, res) => {

    try {

        const { email, senha } = req.body;

        const { data, error } = await supabase
            .from("pacientecadastro")
            .select("*")
            .eq("email", email)
            .eq("senha", senha)
            .single();

        if (error || !data) {

            return res.status(401).json({
                erro: "Email ou senha inválidos"
            });

        }

        return res.status(200).json({
            mensagem: "Login realizado com sucesso",
            usuario: {
                id: data.id,
                nome: data.nome,
                email: data.email,
                celular: data.celular
            }
        });

    } catch (err) {

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });

    }

});

// =========================================
// LISTAR PACIENTES
// =========================================

app.get("/api/pacientes", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("pacientecadastro")
            .select("*");

        if (error) {

            return res.status(400).json({
                erro: error.message
            });

        }

        return res.status(200).json(data);

    } catch (err) {

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });

    }

});

// =========================================
// RENDER / LOCALHOST
// =========================================

if (process.env.VERCEL !== "1") {

    const port = process.env.PORT || 3005;

    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
    });

}

// =========================================
// EXPORTAÇÃO PARA VERCEL
// =========================================

module.exports = app;
