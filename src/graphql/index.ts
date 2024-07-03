import { ApolloServer } from '@apollo/server';
import { User } from './user';

const graphQlServerCreate = async () => {
    const server = new ApolloServer({
        // typeDefs: is a Shema Definition Language (SDL) string that describes the shape of your data in the runtime.,
        typeDefs: `
            type Query {
                hello: String
            } 
            type Mutation {
                ${User.mutations}
            }
        `,

        // resolvers: is an object that contains the resolvers for your GraphQL schema.
        resolvers: {
            Query: {
                ...User.resolvers.Query
            },

            Mutation: {
                ...User.resolvers.Mutation
            }
        },
    });

    await server.start();
    return server;
}

export default graphQlServerCreate;
