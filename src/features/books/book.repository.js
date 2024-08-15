
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';
import { authorSchema } from './author.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

const authorModel = mongoose.model('Author',authorSchema);


export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    async addReviewToBook(bookId, text, rating) {
        const reviewData = {
            text,
            rating,
            book: new mongoose.Types.ObjectId(bookId)
        }
        const review = new reviewModel(reviewData);
        const savedReview = await review.save();

        const book = await booksModel.findById(bookId);

        book.reviews.push(savedReview._id);

        await book.save();

        return savedReview;

    }

    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    // Complete the following four funtions.
    async createAuthor(authorData) { 
        const newAuthor = new authorModel(authorData);
        const savedAuthor = await newAuthor.save();
        return savedAuthor;

    }

    async addAuthorToBook(bookId, authorId) {
        const book = await booksModel.findById(bookId);

    // Check if the book exists
    if (!book) {
        throw new Error('Book not found');
    }

    // Check if the authorId is already associated with the book
    if (book.authors.includes(authorId)) {
        throw new Error('Author is already associated with this book');
    }

    // Add the authorId to the book's authors array
    book.authors.push(authorId);

    // Save the updated book document
    await book.save();

    // Optionally: update the author document if needed
    // (Assuming you have an `Author` schema with a `books` field)
    const author = await authorModel.findById(authorId);
    if (author) {
        // Add the bookId to the author's books array
        if (!author.books.includes(bookId)) {
            author.books.push(bookId);
            await author.save();
        }
    }

    return book;
     }

    async listAuthorsByBook(bookId) {
        // const book = await booksModel.findById(bookId);
        // const authors = book.authors;
        // console.log(authors);
        // return authors; 
        // Find the book and populate authors
        const book = await booksModel.findById(bookId).populate('authors');
        if (!book) {
            throw new Error('Book not found');
        }
        return book.authors;
     }

    async listBooksByAuthor(authorId) {
        // const author = await authorModel.findById(authorId);
        // const books = await author.books;
        // console.log(books);
        // return books;
         // Find the author and populate books
         const author = await authorModel.findById(authorId).populate('books');
         if (!author) {
             throw new Error('Author not found');
         }
         return author.books;
     
     }
}