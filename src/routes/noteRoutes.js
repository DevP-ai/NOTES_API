const express = require("express");
const {createNote,updateNote,deleteNote,getNotes} = require("../controllers/noteController");
const { auth } = require("../middlewares/auth");

const notesRouter = express.Router();

notesRouter.get("/",auth,getNotes);

notesRouter.post("/",auth,createNote);

notesRouter.delete("/:id",auth,deleteNote);

notesRouter.put("/:id",auth,updateNote);

module.exports = notesRouter;