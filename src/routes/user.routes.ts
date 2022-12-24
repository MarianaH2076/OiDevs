import { Router, Request, Response } from "express";
import { v4 } from 'uuid';
import { User } from "../domain/entities/user";
import { UserDto } from "../domain/dtos/userDto";
//import pra usar o prisma
import { PrismaClient } from "@prisma/client";

import { deleteUser, listUser } from "../controllers/userController";
import { getUser } from "../controllers/userController";
import { createUser } from "../controllers/userController";
import { updateUser } from "../controllers/userController";

const userRouter = Router();
const prisma = new PrismaClient();

//Criação de endpoints
userRouter.get('/', listUser);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser)

export default userRouter;