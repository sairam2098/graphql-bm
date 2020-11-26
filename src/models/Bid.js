const { model, Schema } = require('mongoose');

const bidSchema = new Schema({
    biddenBook: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    },
    bidderBook: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String
});

module.exports = model('bids', bidSchema);