var express = require('express');
var api = require('../controllers/apiController');

// Setup our router
var router = express.Router();

// Set up some important middleware for preflight
router.use((req,res,next)=> {
    res.set({"Content-type": "application/json"});
    res.set({"Access-Control-Allow-Origin":"*"});
    res.set({
         "Access-Control-Allow-Methods":
         "GET,PUT,POST,DELETE,OPTIONS",
    });
    res.set({
         "Access-Control-Allow-Headers":
         "Content-Type,Access-Control-Allow-Headers"
    });

    // if this is a preflight, we are done
    if(req.method == 'OPTIONS'){
        return res.status(200).end();
    }
    next();
});

// Read a list of bookreviews
router.get('/', api.list);

// Create a single quote
router.post('/create', api.create);

// Read a single quote in an edit form
router.get('/:bookreviewid', api.read);

// Update a single quote
router.put('/update', api.update);

// Delete a single quote
router.delete('/delete', api.delete);

module.exports = router;
