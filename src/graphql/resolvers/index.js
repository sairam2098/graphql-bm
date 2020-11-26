const booksResolvers = require('./books');
const usersResolvers = require('./users');
const bidResolvers = require('./bids');

module.exports = {
    Query: {
        ...booksResolvers.Query,
        ...bidResolvers.Query
    },
    Mutation : {
        ...usersResolvers.Mutation,
        ...booksResolvers.Mutation,
        ...bidResolvers.Mutation
    }
}