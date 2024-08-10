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
}