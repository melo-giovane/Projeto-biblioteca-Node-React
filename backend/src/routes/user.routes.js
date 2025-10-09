import { Router } from "express";
import {
    criarUsuario,
    listarUsuarios,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/", criarUsuario);

router.get("/", listarUsuarios);

export default router;
