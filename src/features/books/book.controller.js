import mongoose from 'mongoose';
import BookRepository from "./book.repository.js";

export default class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
    }


    // creation of book
    createBook = async (req, res) => { 
        try {
            const newBook = await this.bookRepository.createBook(req.body); // Await the asynchronous method
            res.status(201).json(newBook); // Use 201 for resource creation
        } catch (err) {
            console.error(err); // Log the error
            res.status(500).json({ error: "Something went wrong with the database" }); // Provide a meaningful error message
        }
    }

    // filtering of book by id
    getOne = async (req, res) => {
        try{

            const FindBook = await this.bookRepository.getOne(req.params.id);
            if(FindBook)
            res.status(200).send(FindBook);
            else{
                return res.status(404).send("bookid does not exist");
            }
  
  
          }catch(err){
              console.log(err);
              return res.status(404).send("bookid does not exist");
          }
     }

       //filtering the books based on genre
  listBooksByGenre = async (req, res) => {
    const { genre } = req.params; // Extract genre from the request parameters

    try {
        const books = await this.bookRepository.listBooksByGenre(genre);
        if (books && books.length > 0) {
            res.status(200).json(books); // Return the list of books if found
        } else {
            res.status(404).send("No books found for the specified genre");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while retrieving books");
    }
  };

  //increasing the count of available books
  updateBookAvailability = async (req, res) => {
    const { bookId } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number') {
        return res.status(400).send("Quantity must be a number");
    }

    try {
        const updatedBook = await this.bookRepository.updateBookAvailability(bookId, quantity);
        if (updatedBook) {
            res.status(200).json(updatedBook); 
        } else {
            res.status(404).send("Book not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating book availability");
    }
  };

  //deletion of book
  deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const result = await this.bookRepository.deleteBookById(bookId);
        if (result.deletedCount > 0) {
            res.status(200).send("Book successfully deleted");
        } else {
            res.status(404).send("Book not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while deleting the book");
    }
  };

}
