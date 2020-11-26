const Bid = require('../../models/Bid');
const Book = require('../../models/Book');
const checkAuth = require('../../utils/checkAuth');
const bookResolver = require('./books');

module.exports = {
    Query: {
        async getBids() {
            try {
                const bids = await Bid.find().sort({ createdAt: -1 });

                const bidList = [];
                if (bids) {
                    for (const bid of bids) {
                        const biddenBook = await Book.findById(bid.biddenBook);
                        const bidderBook = await Book.findById(bid.bidderBook);
                        bidList.push({
                            id: bid.id,
                            biddenBook,
                            bidderBook,
                            user: bid.user,
                            createdAt: bid.createdAt
                        });
                    }
                }
                return bidList;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async postBid(_, { bidInput: { biddenBookId, bidderBookId } }, context) {
            try {
                const validUser = checkAuth(context);

                const newBid = new Bid({
                    biddenBook: biddenBookId,
                    bidderBook: bidderBookId,
                    user: validUser.id,
                    createdAt: new Date().toISOString()
                })

                const bid = await newBid.save();
                const biddenBook = await Book.findById(bid.biddenBook);
                const bidderBook = await Book.findById(bid.bidderBook);
                return {
                    id: bid.id,
                    biddenBook,
                    bidderBook,
                    user: bid.user,
                    createdAt: bid.createdAt
                };
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}