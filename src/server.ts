//sua única responsabilidade é ser o servidor

import express from 'express';
import logsMiddleware from './middlewares/logs';
import errorsMiddleware from './middlewares/errors';
import routes from './routes';

const server = express();
const port = 3333;

//deserialização de json
server.use(express.json());

server.use(logsMiddleware);

//adicionando as rotas (a pasta onde estão as rotas,  na verdade)
server.use(routes);
server.use(errorsMiddleware);

server.listen(port, () => {
    return console.log(`Server is running on port ${port}`)
});