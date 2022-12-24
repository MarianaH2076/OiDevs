//sua única responsabilidade é mapear as rotas da aplicação

import { Router } from "express";
import cartsRouter from "./carts.routes";
import productsRouter from "./products.routes";
import userRouter from "./user.routes"; 

const routes = Router();

//mapeamento de rotas
routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/carts', cartsRouter)

export default routes;