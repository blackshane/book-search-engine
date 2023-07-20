const { AuthenticationError } = require('apollo-server-express')
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    // Query the user with the 'me' query 
    me: async (parent, args, context) => {
        try {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('savedBooks');
          }
  
          throw new AuthenticationError('Authentication required');
        } catch (error) {
          throw new Error(`Failed to fetch user: ${error.message}`);
        }
    },
    books: async () => {
        try {
            const books = await Book.find({});
            return books;
        } catch (err) {
            console.error(err);
            throw err;
        }
      
    }
},

Mutation: {
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
},


login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AuthenticationError('No user found with this email address');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);

    return { token, user };
}

}

module.exports = resolvers;