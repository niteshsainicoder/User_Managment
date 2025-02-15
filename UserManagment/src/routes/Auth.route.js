import { Router } from "express";
import { Login, Signup } from "../Controllers/Auth.Controller.js";
import { validateLogin, validateUser } from "../middelware/Validation.middelware.js";

const authRoute = Router();

authRoute.post('/api/auth/signup', validateUser, Signup);
authRoute.post('/api/auth/login', validateLogin, Login);

export { authRoute }