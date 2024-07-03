import UserService, { createUserPayload } from "../../services/user"

const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const res = await UserService.getUser(payload);
        return res.token
    }
}

const mutations = {
    createUser: async (_: any, payload:createUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id
    }
}

export const resolvers = {
    Query: queries,
    Mutation: mutations
}