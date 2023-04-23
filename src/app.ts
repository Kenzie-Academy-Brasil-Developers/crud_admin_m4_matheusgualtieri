import express, { Application, json } from "express";
import { errorHandler } from "./error";
import userRoutes from "./routers/user.routes";
import loginRoutes from "./routers/login.routes";

const app: Application = express();

app.use(json());

app.use("/users", userRoutes);

app.use("/login", loginRoutes);

app.use(errorHandler);

export default app;
