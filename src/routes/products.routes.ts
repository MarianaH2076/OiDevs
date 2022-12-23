import { Router, Request, Response } from "express";
import { v4 } from 'uuid';
import { Product } from "../domain/entities/product";
import { ProductDto } from "../domain/dtos/productDto";
import { PrismaClient } from "@prisma/client";

const productsRouter = Router();
const prisma = new PrismaClient();

let products: Product[] = [];

//Criação de endpoints
productsRouter.get('/', async (request: Request, response: Response) => {
    const products = await prisma.product.findMany();
    return response.json(products)
})

interface GetParams {
    id: string
}

productsRouter.get('/:id', async (request: Request<GetParams>, response: Response) => {   
    const {id} = request.params;
    const product = await prisma.product.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })
    
    if(!product) {
        return response.status(404).send("Product not found")
    }

    return response.send(product)
})

productsRouter.post('/', async (request: Request<{}, {}, ProductDto>, response: Response) => {
    const product = request.body;

    if(!product.author) {
        return response.status(404).send({
            field: 'author',
            message: 'Author is invalid'
        })
    }

    if(!product.name) {
        return response.status(404).send({
            field: 'name',
            message: 'Name is invalid'
        })
    }

    if(!product.price) {
        return response.status(404).send({
            field: 'price',
            message: 'Price is invalid'
        })
    }

    const createdProduct = await prisma.product.create({
        data: {
            id: v4(),
            author: product.author,
            name: product.name,
            price: product.price
        }
    })
    return response.json(createdProduct)
})

interface PutParams {
    id: string
}

productsRouter.put('/:id', async (request: Request<PutParams, {}, Omit<ProductDto, 'id'>>, response: Response) => {
    const {id} = request.params;
    const productData = request.body;

    const product = await prisma.product.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })
    
    if(!product) {
        response.status(404).send("Product not found!")
    }

    const updatedProduct = await prisma.product.update({
        data: {
            id: id,
            author: productData.author,
            name: productData.name,
            price: productData.price
        },
        where: {
            id: id
        }
    })

    return response.send(updatedProduct)
})

productsRouter.delete('/:id', async (request: Request, response: Response) => {
    const {id} = request.params;
    
    // primeiro: o usuário existe?
    const product = await prisma.product.findFirst({
        where: {
            id: {
                equals: id
            }
        }
    })

    if(!product) {
        return response.status(404).send('Product not found!')
    }

    const deletedProduct = await prisma.product.delete({
        where: {
            id: id
        }
    })

    return response.send('Product deleted!')

})

export default productsRouter;