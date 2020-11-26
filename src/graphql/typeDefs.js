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
    type Bid{
        id: ID!,
        biddenBook: Book,
        bidderBook: Book,
        user: ID!,
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
    input BidInput{
        biddenBookId: ID!,
        bidderBookId: ID!
    }

    type Query{
        getBooks: [Book]
        getBook(bookId: String): Book!
        getBids: [Bid]
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String, password: String): User!
        postBook(bookInput: BookInput): Book!
        deleteBooks(bookId: String): String!
        postBid(bidInput: BidInput): Bid!
    }
`