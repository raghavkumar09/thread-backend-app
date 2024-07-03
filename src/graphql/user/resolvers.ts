const queries = {}

const mutations = {
    createUser: async (_: any, {}:{}) => {
        return 'raghav'
    }
}

export const resolvers = {
    Query: queries,
    Mutation: mutations
}