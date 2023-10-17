const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notesDb = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const util = require('util');

app.use(express.json());
app.use(express.static('public'));

// a route path which listens for a get request from the /api/notes and responds with db.json
app.get('/api/notes', (req, res) => {
    res.json(notesDb);
});

// a route path which listens for a post request from /api/notes, and responds with a json including the recently pushed and already existing notes
app.post('/api/notes', (req, res) => {
    
    let jsonFilePath= path.join(__dirname, "db/db.json");
    let newNote = req.body;

    notesDb.push(newNote);
    console.log(notesDb);

    try{
        fs.writeFileSync(jsonFilePath, JSON.stringify(notesDb), (err) => {
            if(err) {
                return console.log(err);
            }
            console.log('Note is in database')
        })
    }catch(err) {
        console.log(err);
    }
    res.json(newNote);
})

// a route path which listens for a get request from /notes and responds with sending the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

// a route path which listens for a get request from a catch-all, and responds with sending the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// If the server connects when prompted, successfully connected will log
app.listen(PORT, () => console.log('Successfully connected'));