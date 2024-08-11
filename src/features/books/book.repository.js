import mongoose from 'mongoose';
import bookSchema from './book.schema.js';


const bookModel = mongoose.model('book',bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
      
        const newBook = new bookModel(bookData);
       await newBook.save();
        return newBook;
    }

    //filtering the book by id
    async getOne(id) {
        try{
            return await bookModel.findOne({id});
          }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
          }

    }

    
    //filtering the books based on genre
    async listBooksByGenre(genre) {
      try {
          const books = await bookModel.find({ genre }); 
          return books;
      } catch (err) {
          throw new Error("Failed to retrieve books by genre");
      }
   }

  //increasing the count of available books
  async updateBookAvailability(bookId, quantity) {
      try {
          const updatedBook = await bookModel.findOneAndUpdate(
              { _id: bookId },
              { $inc: { availableCopies: quantity } }, 
              { new: true } 
          );
          return updatedBook;
      } catch (err) {
          throw new Error("Failed to update book availability");
      }
   }

  //deletion of book
  async deleteBookById(bookId) { 
      try {
          const deletedBook = await bookModel.findByIdAndDelete(bookId);
          return deletedBook;
      } catch (err) {
          throw new Error("Failed to delete the book");
      }
  }
}