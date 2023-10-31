const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');


//Route 1 Get All the notes using: Get "/api/notes/fetchallnotes" . Login required



router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id });

        res.json(notes);

    } catch (error) {

        console.error(error.message);

        return res.status(500).send("Internel server error");
    }


});


//Route 2 Add a new Note using: Post "/api/notes/addnotes" . Login required



router.post("/addnotes", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() });

        }

        const note = new Note({

            title, description, tag, user: req.user.id

        })

        const savedNote = await note.save()


        res.json(savedNote);

    } catch (error) {
        console.error(error.message);

        return res.status(500).send("Internel server error");
    }


});


//Route 3 Update a existing note using: Put "/api/notes/updatenotes" . Login required


router.put("/updatenotes/:id", fetchuser, [

], async (req, res) => {

    const { title, description, tag } = req.body;

    try {


        //Create newNote object

        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        //Find a note to be update and update it//

        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("Note not found") };



        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote, new: true })
        res.json({ note });
    }

    catch (error) {
        console.error(error.message);

        return res.status(500).send("Internel server error");
    }
})

//Route 4 Delete a existing note using: Delete "/api/notes/deletenote" . Login required


router.delete("/deletenote/:id", fetchuser, [

], async (req, res) => {
    

    try {


        //Find a note to be delete and delete it//

        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("Note not found") };

        //Allow deletion if user own this note//

        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ 'Success': "Note has been deleted" });

    } catch (error) {

        console.error(error.message);

        return res.status(500).send("Internel server error");
    }
})


module.exports = router
