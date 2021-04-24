// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');


// sets up app and ports
const app = express();
const PORT = process.env.PORT || 3000;


// make all file paths
const dbPath = path.join(__dirname, 'db', 'db.json');
const notesHtmlPath = path.join(__dirname, 'public', 'notes.html');
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
const staticPath = path.join(__dirname, 'public');


// Wee data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// give assets
app.use(express.static(staticPath));

// sends user to notes page
app.get('/notes', (req, res) => res.sendFile(notesHtmlPath));

// todo Return Notes
app.get('/api/notes', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(dbPath);
});

// makes all other routes route to index page
app.get('*', (req, res) => res.sendFile( indexHtmlPath ));

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        res.status(400);
        res.send('Title and text are required.');
        return;
    }

    const newnote = {
        title,
        text,
        id: uniqid()
    };

    const notesText = fs.readFileSync(dbPath);
    const notes = JSON.parse(notesText);
    notes.push(newnote);
    const notesDiff = JSON.stringify(notes, null, '\t');
    try {
        fs.writeFileSync(dbPath, notesDiff);
    } catch (error) {
        console.log(error);
    }
    console.log('Note added!');
    res.json(newnote);
});

app.delete('/api/notes/:id', (req, res) => {
    const notesText = fs.readFileSync(dbPath);
    const notes = JSON.parse(notesText);
    const newdb = notes.filter(function (note) {
        const noteId = req.params.id;
        return note.id != noteId;
    });
    const updatedNotes = JSON.stringify(newdb, null, '\t');
    try {
        fs.writeFileSync(dbPath, updatedNotes);
    } catch (error) {
        console.log(error);
    }
    console.log('Note deleted!');
    res.send('Note deleted!');
});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));