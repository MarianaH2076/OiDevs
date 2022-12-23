import { Router, Request, Response } from "express";
import { v4 } from 'uuid';
import { User } from "../domain/entities/user";
import { UserDto } from "../domain/dtos/userDto";
//import pra usar o prisma
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//Criação de endpoints
userRouter.get('/', async (request, response) => {
    const users = await prisma.user.findMany({
        include: {
            itens: true
        }
    })
    return response.json(users);
})

interface GetParams{
    id: string
}

userRouter.get('/:id', async (request: Request<GetParams>, response: Response) => {
    const {id} = request.params;
    const user = await prisma.user.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })
    
    if(!user) {
        return response.status(404).send("User not found")
    }

    return response.send(user)
})

userRouter.post('/', async (request: Request<{}, {}, UserDto>, response: Response) => {
    const user = request.body;

    if(!user.name) {
        return response.status(404).send({
            field: 'name',
            message: 'Name is invalid'
        })
    }

    if(!user.email || !emailRegex.test(user.email)) {
        return response.status(404).send({
            field: 'email',
            message: 'Email is invalid'
        })
    }

    const createdUser = await prisma.user.create({
        data: {
            id: v4(),
            name: user.name,
            email: user.email
        }
    })
    return response.json(createdUser)
})

interface PutParams{
    id: string
}

userRouter.put('/:id', async (request: Request<PutParams, {}, UserDto>, response: Response) => {
    const {id} = request.params;
    const userData = request.body;

    const user = await prisma.user.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })
    
    if(!user) {
        response.status(404).send("Produto não encontrado")
    }

    const updatedUser = await prisma.user.update({
        data: {
            id: id,
            name: userData.name,
            email: userData.email
        },
        where: {
            id: id
        }
    })

    return response.send(updatedUser)
})

userRouter.delete('/:id', async (request: Request, response: Response) => {
    const {id} = request.params;
    
    //procurar se o usuário existe

    const user = await prisma.user.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })

    if(!user) {
        return response.status(404).send('User not found!')
    }

    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })

    return response.send('User deleted!')

})

export default userRouter;