import { Router } from "express";
// import { v4 } from 'uuid';
// import { Product } from "../domain/entities/product";
// import { ProductDto } from "../domain/dtos/productDto";
// import { PrismaClient } from "@prisma/client";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/productController";

const productsRouter = Router();

//Criação de endpoints
productsRouter.get('/', listProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', createProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;