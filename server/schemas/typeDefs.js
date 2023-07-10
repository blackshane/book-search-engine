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
bookId: String!
authors:[String]
description: String!
title: String!
image: String
link: String
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