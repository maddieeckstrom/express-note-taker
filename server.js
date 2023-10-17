const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notesDb = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const util = require('util');

app.use(express.json());
app.use(express.static('public'));

//WORK ON CODE BELOW
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
        //console.log(newNote);
        //const oneNote = readFileAsync(notesDb);
        //console.log(jsonFile);
        //console.log(notesDb);
    }catch(err) {
        console.log(err);
    }
    res.json(newNote);
})

app.get('/notes', (req, res) => {
    //console.log('notes retrieved');
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('*', (req, res) => {
    //console.log('catch all');
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

  
//app.post here


app.listen(PORT, () => console.log('Successfully connected'));