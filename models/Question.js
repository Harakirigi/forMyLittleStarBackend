const mongoose = require("./dataBase")

const questionSchema = new mongoose.Schema({
    star: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Star', 
        required: true
    },
    content: {type: String, required: true},
    answer: {type: mongoose.Schema.Types.ObjectId},
    answerContent: {type: String}
},{timestamps: true, versionKey: false, collection: 'Question'});
    
const Question = mongoose.model('Question', questionSchema);


module.exports = Question;