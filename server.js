const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notesDb = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const util = require('util');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notesDb);
});

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

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => console.log('Successfully connected'));