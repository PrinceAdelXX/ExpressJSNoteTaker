const fs = require('fs');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/notes', (req, res) => {
    res.render('notes');
});

app.get('/api/notes', (req, res) => {
    let rawData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(rawData);
    res.send(notes);
});

app.post(('/api/notes'), (req, res) => {
    let rawData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(rawData);
    let newNote = req.body;
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, undefined, 4));
    res.send(notes);
});

app.delete(('/api/notes/:id'), (req, res) => {
    let rawData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(rawData);
    notes = notes.filter((item) => item.id != Number(req.params.id));
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, undefined, 4));
    res.send(notes);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});