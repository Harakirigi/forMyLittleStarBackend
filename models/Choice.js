const mongoose = require("./dataBase")

const choiceSchema = new mongoose.Schema({
    star: {type: mongoose.Schema.Types.ObjectId, ref: 'Star', required: true},
    choiceKey: {type: String, required: true},
    choiceValue: {type: String}
},{timestamps: true, versionKey: false, collection: 'Choice'});
    
const Choice = mongoose.model('Choice', choiceSchema);


module.exports = Choice;