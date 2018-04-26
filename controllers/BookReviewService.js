var BookReview = require("../models/bookReviewModel");

// Create our Service 
var BookReviewService = {};


// List the book reviews
BookReviewService.list = function() {
    // Query the model of the database
    return BookReview.find({})
      .then((bookReviews)=> {
          return bookReviews;
      })
    .catch( (err)=>{
        console.log(err);
        throw err;
    });
}


// Create a book review and save it to the database
BookReviewService.create = function(bookReviewObj) {

    var bookReview = new BookReview(bookReviewObj);
    return bookReview.save()
        .then((bookReview) => {
            console.log("Service: Saving: " + bookReview);
            return bookReview;
    })
    .catch( (err)=>{
        throw err;
    });
}

// Read a single book review and populate edit file
BookReviewService.read = function(bookReviewId) {
    console.log("finding "+ bookReviewId);
    return BookReview.findOne({'_id': bookReviewId})
     .then( (bookReview)=>{
         console.log("Here is the book review");
         console.log(bookReview);
         return bookReview;
     }).catch( (err)=>{
         throw err;
     });
}

// Update a single quote (save to database)
BookReviewService.update = function(bookReviewId, bookReviewObj) {
    return BookReview.findByIdAndUpdate(bookReviewId,{ $set: bookReviewObj }, { new: true })
     .then( (bookReview)=>{
           return bookReview;
     }).catch( (err)=>{
         if(err) console.log(err);
     });
}

// Delete a single book review and remove it from database
BookReviewService.delete = function(bookReviewId) {
    return BookReview.findByIdAndRemove(bookReviewId)
        .then( (bookReview) => {
            return bookReview;
    })
    .catch( (err)=>{
       throw err;
     });
}

module.exports = BookReviewService;
