const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Schema is a constructor - object will get created - noteSchema will be of Schema type
const noteSchema = new Schema(
{
     title :{type:String , required:true},
     description:{type:String,required:true}
}
);

module.exports = mongoose.model('Note',noteSchema);