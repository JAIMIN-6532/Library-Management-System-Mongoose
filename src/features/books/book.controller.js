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

    addReviewToBook = async (req, res) => {

        const { bookId } = req.params;
        const { text, rating } = req.body;
    
        try {
          const book = await this.bookRepository.getOne(bookId);
          if (!book) {
            res.status(404).send("book  not found.");
          } else {
            const review = await this.bookRepository.addReviewToBook(bookId, text, rating);
            res.status(200).json(review);
          }
    
    
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Falied to add review" });
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
  createAuthor = async (req, res) => {
    const { name } = req.body;

    try {
      const authorData = { name };
      const savedAuthor = await this.bookRepository.createAuthor(authorData);
      res.status(201).json(savedAuthor);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to create a new author' });
    }
  };

  addAuthorToBook = async (req, res) => {
    const { bookId } = req.params;
    const { authorId } = req.body;

    try {
      const { book, author } = await this.bookRepository.addAuthorToBook(bookId, authorId);
      res.status(200).json({ book, author });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to associate author with book' });
    }
  };

  listAuthorsByBook = async (req, res) => {
    const { bookId } = req.params;

    try {
      const authors = await this.bookRepository.listAuthorsByBook(bookId);
      res.status(200).json(authors);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to retrieve authors of the book' });
    }
  };

  listBooksByAuthor = async (req, res) => {
    const { authorId } = req.params;

    try {
      const books = await this.bookRepository.listBooksByAuthor(authorId);
      res.status(200).json(books);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to retrieve books by the author' });
    }
  };

}
