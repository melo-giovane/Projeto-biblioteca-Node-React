import { PrismaClient } from "@prisma/client";

// Crie uma única instância do Prisma Client
const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Opcional: para ver as queries no console
});

export default prisma;
