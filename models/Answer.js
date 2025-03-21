const mongoose = require("./dataBase")

const answerSchema = new mongoose.Schema({
    star: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Star',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    content: {type: String, required: true},
},{timestamps: true, versionKey: false, collection: 'Answer'});
    
const Answer = mongoose.model('Answer', answerSchema);


module.exports = Answer;