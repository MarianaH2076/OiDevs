import { Router, Request, Response } from "express";
import { v4 } from 'uuid';
import { Product } from "../domain/entities/product";
import { CartDto } from "../domain/dtos/cart";
import { PrismaClient, Cart } from "@prisma/client";
import { createCart, deleteCart, listCarts } from "../controllers/cartController";
    /*no import do cartController eu sei que deveria ter a função getCarts, mas como eu a comentei no arquivo cartController,
    achei melhor tirá-la daqui só pra não ficar dando erro no código
    */

const cartsRouter = Router();

cartsRouter.get('/', listCarts);
// cartsRouter.get('/:id', getCarts);
cartsRouter.post('/', createCart);
cartsRouter.delete('/:id', deleteCart);

// cartsRouter.put('/:id', async (request: Request<PutParams, {}, Omit<CartDto, 'id'>>, response: Response) => {
//     const {id} = request.params;
//     const cartData = request.body;

//     const cart = await prisma.cart.findFirst({
//         where: {
//             id: {
//                 equals: id
//             }
//         }
//     })
    
//     if(!cart) {
//         response.status(404).send("Cart not found!")
//     }

//     const updatedCart = await prisma.cart.update({
//         data: {
//             id: id,
//             userId: cart?.userId,
//             valorTotal: cart?.valorTotal
//         },
//         where: {
//             id: id
//         }
//     })

//     return response.send(updatedCart)
// })



export default cartsRouter;