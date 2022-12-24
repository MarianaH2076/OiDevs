import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { UserDto } from "../domain/dtos/userDto";
import { crypt } from "../services/crypto";

const prisma = new PrismaClient();
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export async function listUser(request: Request, response: Response){
    const users = await prisma.user.findMany({
        include: {
            purchases: true
        }
    })
    return response.json(users);
}

interface GetParams{
    id: string
}

export async function getUser(request: Request, response: Response){
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
}

export async function createUser(request: Request<{}, {}, Omit<UserDto, 'id'>>, response: Response){
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

    const hashed = crypt(user.password);

    const createdUser = await prisma.user.create({
        data: {
            id: v4(),
            name: user.name,
            email: user.email,
            password: hashed.hash,
            salt: hashed.salt
        }
    })
    return response.json(createdUser)
}

interface PutParams{
    id: string
}

export async function updateUser(request: Request<PutParams, {}, UserDto>, response: Response) {
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
}

export async function deleteUser(request: Request, response: Response){
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
}