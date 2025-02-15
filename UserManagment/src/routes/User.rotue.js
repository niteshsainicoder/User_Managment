import { Router } from "express";
import { authMiddleware } from "../middelware/Auth.middelware.js";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/User.controller.js";

const userRotue = Router();

userRotue.post('/api/users/', authMiddleware(), createUser)
userRotue.get('/api/users/:id', authMiddleware(), getSingleUser)
userRotue.get('/api/users/', authMiddleware(), getAllUser)
userRotue.put('/api/users/:id', authMiddleware(), updateUser)
userRotue.delete('/api/users/:id', authMiddleware(), deleteUser)



export { userRotue }