const { gql } = require('apollo-server');

module.exports = gql`
    type Book{
        id: ID!,
        title: String!,
        author: String!,
        createdAt: String!
        user: ID!
    }
    type User{
        id: ID!,
        email: String!,
        token: String!,
        username: String!,
        createdAt: String!
    }
    input RegisterInput{
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }
    input BookInput{
        title: String!,
        author: String!
    }
    type Query{
        getBooks: [Book]
        getBook(bookId: String): Book!
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String, password: String): User!
        postBook(bookInput: BookInput): Book!
        deleteBooks(bookId: String): String!
    }
`