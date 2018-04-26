
var mongoose = require('mongoose');

// get access to Schema Constructor
var Schema = mongoose.Schema;

var bookReviewSchema =  new Schema({
    title: {type: String, required: true},
    author: { type: String, required: true},
    reviewer: {type: String, required: true},
    review: {type: String, required: true},
    createdAt:  { type: Date, required: true, default: Date.now },
    updatedAt: {type: Date}
});

bookReviewSchema.pre('save', (next)=>{
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    else {
        this.updatedAt = new Date();
    }
    next();
});
// export the model with associated name and schema
module.exports = mongoose.model("BookReview", bookReviewSchema);
