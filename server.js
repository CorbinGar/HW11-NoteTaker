// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');


// sets up app and ports
const app = express();
const PORT = process.env.PORT || 3000;



app.get('/api/notes', (req, res) => {

});


app.post('/api/notes', (req, res) => {

});

app.delete('/api/notes/:id', (req, res) => {

});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));