import express from "express";
import cors from "cors";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//configuração do cors
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

//rotas da api
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("hello");
});

export default app;
