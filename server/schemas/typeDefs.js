const { gql } = require('apollo-server-express');

const typeDefs = gql`

# Define User type
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]    
}

# Define Book type
type Book {
bookId: Int
authors:[String]
description: String
title: String
# TODO: ADD IMAGE AND LINK HERE!!!!!!
}

# Define Auth type
type Auth {
    # TODO: ADD token HERE!
    user: [User]
}
type Query {
    users: [User]
    books: [Book]
}
`