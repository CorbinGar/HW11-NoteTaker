// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');


// sets up app and ports
const app = express();
const PORT = process.env.PORT || 3000;



// todo make all file paths
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
const notesHtmlPath = path.join(__dirname, 'public', 'notes.html');
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
const staticPath = path.join(__dirname, 'public');


// give assets
app.use(express.static(staticPath));

// todo Return Notes
app.get('/api/notes', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(dbFilePath);
});

// makes all other routes route to index page
app.get('*', (req, res) => res.sendFile( indexHtmlPath ));

app.post('/api/notes', (req, res) => {


});

app.delete('/api/notes/:id', (req, res) => {

});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));