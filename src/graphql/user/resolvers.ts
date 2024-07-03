import UserService, { createUserPayload } from "../../services/user"

const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const res = await UserService.getUser(payload);
        return res.token
    },
    getCurrentUserLoginUser: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
            const id = context.user.userId
            const user = await UserService.getUserById(id)
            return user
        }
        return `I don't know yet`
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