const { User, Book } = require('../models');

const resolvers = {
Query: {
    users: async () => {
        return await User.find({})
    }
},

Mutation: {
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
},




}

module.exports = resolvers;