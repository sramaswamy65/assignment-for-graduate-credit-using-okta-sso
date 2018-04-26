var BookReviewService = require("./BookReviewService");

// Create our controller
var apiController = {};


// List the book reviews
apiController.list = function(req,res) {
    console.log("Calling List Reviews");
    // Query the model of the database
    BookReviewService.list({})
      .then((bookReviews)=>{
          res.json(bookReviews);
    })
    .catch( (err)=>{
        console.log(err);
        res.end("Listing Error");
    });
}


// Create a book review and save it to the database
apiController.create = function(req,res) {
    console.log("calling Create");
    BookReviewService.create({ 
        title : req.body.title,
        author : req.body.author,
        reviewer : req.body.reviewer,
        review : req.body.review,
    })
    .then((bookreview)=>{
        console.log("Saving: " + bookreview);
        res.status(201);
        res.json(bookreview);
    })
    .catch( (err)=>{
        console.log(err);
        res.end("Create Error");
    });
}

// Read a single book review and populate edit file
apiController.read = function(req,res) {
    console.log("read a single book");
    console.log("finding "+ req.params.bookreviewid);
    BookReviewService.read(req.params.bookreviewid)
     .then( (bookreview)=>{
        res.json(bookreview);
     }).catch( (err)=>{
        res.end("Read Error");
     });
}

// Update a single quote (save to database)
apiController.update = function(req,res) {
    console.log("Update CALLED");
    BookReviewService.update(req.body.bookreviewid, 
        {
         title : req.body.title,
         author : req.body.author,
         reviewer : req.body.reviewer,
         review : req.body.review
        },
        {new: true}
    )
    .then( (bookreview)=>{
           console.log("Updated: " + bookreview);
           res.json(bookreview);
     }).catch( (err)=>{
         res.end("Update Error");
    });
}

// Delete a single book review and remove it from database
apiController.delete = function(req,res) {
    BookReviewService.delete(req.body.bookreviewid)
        .then( (bookreview) => {
            console.log("Deleted: " + bookreview);
            res.json(bookreview);
        return bookreview
    })
    .catch( (err)=>{
         res.end("Delete Error");
     });
}

module.exports = apiController;
