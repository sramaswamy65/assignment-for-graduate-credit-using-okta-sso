var BookReviewService = require("./BookReviewService");

// Create our controller
var bookReviewController = {};


// List the book reviews
bookReviewController.list = function(req,res) {
    // console.log("XXXXX");
    // Query the model of the database
    BookReviewService.list({})
      .then((bookReviews)=>{
        console.log(bookReviews);
        res.render('list_bookreviews', {
          "bookreviews": bookReviews
      });
    })
    .catch( (err)=>{
        console.log(err);
        bookReviewController.error(err,res);
    });
}


// Create a book review and save it to the database
bookReviewController.create = function(req,res) {

    BookReviewService.create({ 
        title : req.body.title,
        author : req.body.author,
        reviewer : req.body.reviewer,
        review : req.body.review,
    })
    .then((bookreview)=>{
        console.log("Saving: " + bookreview);
        res.redirect('/bookreviews');
    })
    .catch( (err)=>{
        console.log(err);
        bookReviewController.error(err,res);
    });
}

// Read a single book review and populate edit file
bookReviewController.read = function(req,res) {
    console.log("finding "+ req.params.bookreviewid);
    BookReviewService.read(req.params.bookreviewid)
     .then( (bookreview)=>{
       res.render('edit_bookreview',{
         bookreview:bookreview
       });
     }).catch( (err)=>{
         bookReviewController.error(err,res);
     });
}

// Update a single quote (save to database)
bookReviewController.update = function(req,res) {
    console.log("XXX UPDATE");
    BookReviewService.update(req.params.bookreviewid,
                             {
                                 title : req.body.title,
                                 author : req.body.author,
                                 reviewer : req.body.reviewer,
                                 review : req.body.review,
                             })
     .then( (bookreview)=> {
           console.log("Updated: " + bookreview);
           res.redirect('/bookreviews');      
     }).catch( (err)=>{
         bookReviewController.error(err,res);
     });
}

// Delete a single book review and remove it from database
bookReviewController.delete = function(req,res) {
    BookReviewService.delete(req.params.bookreviewid)
        .then( (bookreview) => {
        res.redirect('/bookreviews');      
    })
    .catch( (err)=>{
         if(err) console.log(err);
         bookReviewController.error(err,res);
     });
}

module.exports = bookReviewController;
