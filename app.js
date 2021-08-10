const fs = require('fs');
const path = require('path');
const express = require('express');
const indexRoute = require('./routes/htmlRoutes/index');
const notesRoute = require('./routes/apiRoutes/notes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// use routes
app.use('/', indexRoute);
app.use('/notes', indexRoute);
app.use(notesRoute);

const port = process.env.PORT || 3000;
// listen
app.listen(port, () => {
    console.log(`API server now on port ${port}!`);
});