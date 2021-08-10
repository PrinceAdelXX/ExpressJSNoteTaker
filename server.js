const { notes } = require('./db/db.json');
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function createNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notesArray }, null, 2)
  );
  return note;
};

function deleteNote(id, notesArray) {
  const result = id;
  if (notesArray[result]) {
    let index = notesArray.indexOf(notesArray[result]);
    delete notesArray[result];
    notesArray.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return result;
  }
  console.log('deleted successfully');
};

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET note title query
app.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
      results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// GET id query
app.get('/api/notes/:id', (req, res) => {
    let results = findById(req.params.id, notes);
    res.json(results);
});

// Create note
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNote(req.body, notes);
    res.json(note);
});

// Delete note
app.delete('/api/notes/:id', (req, res) => {
    let results = deleteNote(req.params.id, notes);
    res.json(results);
});

// GET /* should return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

