var express = require('express');
var bookreviews = require('../controllers/bookReviewController');
var router = express.Router();


// Read all the book reviews
router.get('/', bookreviews.list);

// Create a book review
router.post('/create', bookreviews.create);

// Read a single bookreview in an edit form
router.get('/:bookreviewid', bookreviews.read);

// Update a single bookreview
router.post('/update/:bookreviewid', bookreviews.update);

// Delete a single bookreview
router.get('/delete/:bookreviewid', bookreviews.delete);


module.exports = router;
