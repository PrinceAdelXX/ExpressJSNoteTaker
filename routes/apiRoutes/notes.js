const fs = require('fs');
const path = require('path');
const router = require('express').Router();
let notesData = require('../../db/db.json');
const { nanoid }= require('nanoid');

router.post('/api/notes', (req, res)=>{
    const id = nanoid();
    const newNote = createNewNote(req.body, id, notesData);
    res.json(newNote);
});

router.get('/api/notes', (req, res)=>{
    res.json(notesData);
});

router.delete('/api/notes/:id', function (req, res) {
    const result = filterById(req.params.id, notesData);
    // console.log(req.params.id);
    fs.writeFile(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(result, null, 2),
        (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            notesData = result;
            res.json(result);
        });
    console.log(result);
});


function filterById(id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);
    return result;
}

function createNewNote(note, id, noteArray) {
    note.id = id;
    noteArray.push(note);
    console.log(noteArray);
    fs.writeFile(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ noteArray }.noteArray, null, 2), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    return note;
}

module.exports = router;
