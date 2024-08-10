// Please don't change the pre-written code
// make the necessary imports for creating book schema named 'bookSchema'

// Start writing your code here
import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author', // Assuming you have an Author model
        required: true
    },
    genre: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy', 'Other'],
        required: true
    },
    copies: {
        type: Number,
        required: true,
        min: 1
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0
    }
});
export default bookSchema;
