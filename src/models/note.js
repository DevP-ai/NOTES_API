const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
},{timestamps: true});

const noteModel = mongoose.model("Note",notesSchema);

module.exports = noteModel;