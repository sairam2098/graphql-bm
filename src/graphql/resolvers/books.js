const { AuthenticationError } = require('apollo-server');

const Book = require('../../models/Book');
const User = require('../../models/User');
const checkAuth = require('../../utils/checkAuth');
module.exports = {
    Query: {
        async getBooks() {
            try {
                const books = await Book.find().sort({ createdAt: -1});
                return books;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getBook(_, { bookId }) {
            try {
                const book = await Book.findById(bookId);
                if (book) {
                    return book;
                } else {
                    throw new Error('Book not present in DB');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async postBook(_, { bookInput: { title, author } }, context) {
            const user = checkAuth(context);
             
            const newBook = new Book({
                title,
                author,
                createdAt: new Date().toISOString(),
                user: user.id
            });

            const res = await newBook.save();
            return res;
        },
        async deleteBooks(_, { bookId }, context){
            const user = checkAuth(context);
            
            try{
                const book = await Book.findById(bookId);
                const bookUser = await User.findById(book.user);

                if(bookUser.username === user.username){
                    await book.delete();
                    return 'Post deleted sucessfully';
                }else{
                    throw new AuthenticationError('Action not allowed');
                }
            }catch(err){
                throw new Error(err);
            }
        }
    }
}