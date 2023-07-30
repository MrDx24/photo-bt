const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    category: { type: String, required: true },
    th: { type: String, required: true },
    imagefile: { 
        data: { type: Buffer, required: true }, 
        contentType: { type: String , required: true } 
    },
    date: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);;