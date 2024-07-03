import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import  graphQlServerCreate from './graphql';
import { prismaClient } from './lib/db';

const init = async () => {
    const app = express();
    const PORT = Number(process.env.PORT) || 3000;
    app.use(express.json());

    const server = await graphQlServerCreate();
    app.use('/graphql', expressMiddleware(server)); 

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(PORT, () => {
        console.log('Server started on port 3000');
    });
}

init();