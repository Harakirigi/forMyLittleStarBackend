const mongoose = require("./dataBase")

const StarSchema = new mongoose.Schema({
    name: {type: String, required: true},
},{timestamps: true, versionKey: false, collection: 'Star'});
    
const Star = mongoose.model('Star', StarSchema);


module.exports = Star;