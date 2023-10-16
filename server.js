const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notesDb = require('./db/db.json');
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

//WORK ON CODE BELOW
app.get('/api/notes', (req, res) => {
    res.json(notesDb);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    // fsreadFile (stringify), then fs writeFile (parse) to add new object into the array
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