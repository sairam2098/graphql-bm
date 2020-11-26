const booksResolvers = require('./books');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...booksResolvers.Query
    },
    Mutation : {
        ...usersResolvers.Mutation,
        ...booksResolvers.Mutation
    }
}