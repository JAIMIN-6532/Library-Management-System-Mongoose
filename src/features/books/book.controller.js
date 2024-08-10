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

}
