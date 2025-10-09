import {
    criarUser,
    encontrarUserPorEmail,
    encontrarTodosUsuarios,
} from "../models/User.models.js";

const criarUsuario = async (req, res) => {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
        return res
            .status(400)
            .json({ error: "Nome, email e senha são obrigatórios" });
    }

    try {
        const usuarioExistente = await encontrarUserPorEmail(email);

        if (usuarioExistente) {
            return res
                .status(409)
                .json({ error: "Este email já está cadastrado." });
        }

        const hashedSenha = senha; // temporario

        const novoUsuario = await criarUser({
            nome,
            email,
            senha: hashedSenha,
            role,
        });

        return res.status(201).json({
            message: "Usuário registrado com sucesso!",
            user: novoUsuario,
        });
    } catch (error) {
        console.error("Erro ao criar usuário: ", error);
        return res
            .status(500)
            .json({ error: "Erro interno do servidor ao registrar o usuário" });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await encontrarTodosUsuarios();

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error ao listar todos os usuários:", error);
        return res
            .status(500)
            .json({ error: "Erro interno do servidor ao buscar usuários" });
    }
};

export { criarUsuario, listarUsuarios };
