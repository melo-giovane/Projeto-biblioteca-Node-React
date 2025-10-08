import prisma from "../utils/prisma-client.js";
import { UserRolesEnum } from "../utils/constants.js";

const criarUser = async (userData) => {
    const role = userData.role || UserRolesEnum.USUARIO;

    const newUser = await prisma.usuario.create({
        data: {
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha,
            role: role,
        },
        select: {
            id: true,
            nome: true,
            email: true,
            role: true,
        },
    });
    return newUser;
};

const encontrarUserPorEmail = async (email) => {
    const user = await prisma.usuario.findUnique({
        where: {
            email: email,
        },
    });

    return user;
};

const encontrarTodosUsuarios = async () => {
    const users = await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            role: true,
        },
        orderBy: {
            nome: "asc",
        },
    });
    return users;
};

export { criarUser, encontrarUserPorEmail, encontrarTodosUsuarios };
