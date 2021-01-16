const router = require('express').Router();
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id');

function validateNote(note) {
    if(!note.title){
        return false;
    }
    if(!note.text){
        return false;
    }
    return true;
}

function createNewNote(note, notesArray = []) {
    //create a unique id of length 3 using only numbers
    const id = generateUniqueId({
        length: 3,
        useLetters: false
    });
    note.id = id;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    return note;
}

router.get('/notes', (req, res) => {
    return res.json(notes);
});

router.post('/notes', (req, res) => {
    if(!validateNote(req.body)){
        return res.status(400).sned('The note is not properly filled out.');
    } else {
        const note = createNewNote(req.body, notes);
        return res.json(note);
    }
});

module.exports = router;
