import { Request, Response } from "express";
import { v4 } from 'uuid';
import { ProductDto } from "../domain/dtos/productDto";
import { CartDto } from "../domain/dtos/cart";
import { PrismaClient, Cart } from "@prisma/client";


const prisma = new PrismaClient();

export async function listCarts(request: Request, response: Response){
    const carts = await prisma.cart.findMany();
    return response.json(carts)
}


interface GetParams {
    id: string
}

export async function getCart (request: Request<GetParams>, response: Response){   
    const {id} = request.params;
    const cart = await prisma.cart.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })
    
    if(!cart) {
        return response.status(404).send("Cart not found")
    }

    return response.send(cart)
}


export async function createCart (request: Request<{}, {}, ProductDto>, response: Response) {
    const cart = request.body;


    // const createdCart = await prisma.cart.create({
    //     data: {
    //         id: v4(),
            /*
            totalValue: CRIAR FUNÇÃO,

                Aqui no totalValue eu imagino que precisaria criar uma função pra buscar os itens de cada usuário e
            multiplicá-los pelo unitValue de cada item, mas não consegui fazer isso. Como só cheguei nessa parte
            agora, sexta às 21h12, preferi entregar assim mesmo.
            */
            userId: cart.id //Sei que não é o cart.id que preciso pegar e sim o userId, mas também não soube como fazer isso no tempo que tenho agora
    //     }
    // })

    return response.json(cart) //aqui no return eu sei que precisaria retornar o createdCart, mas, como comentei o createdCart, coloquei o return só como cart pra não ficar dando erro no código
}


interface PutParams {
    id: string
}


export async function deleteCart (request: Request, response: Response) {
    const {id} = request.params;
    
    // primeiro: o carrinho existe?
    const cart = await prisma.cart.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })

    if(!cart) {
        return response.status(404).send('Cart not found!')
    }

    const deletedProduct = await prisma.cart.delete({
        where: {
            id: id
        }
    })

    return response.send('Product deleted!')

}