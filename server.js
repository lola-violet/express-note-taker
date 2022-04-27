// Variables for required packages
const express = require('express');
const path = require('path');
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
// Variables for port & app
const PORT = process.env.PORT || 3000;
const app = express();
// Middleware for parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve all static assets from public directory
app.use(express.static('public'));



// GET request for /api/notes
app.get("/api/notes",(req,res)=>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } else {
            const notes = JSON.parse(data);
            res.json(notes)
        }
    })
})

// POST request for /api/notes
app.post("/api/notes",(req,res)=>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } else {
            const notes = JSON.parse(data);
            const newNoteObj = {
                ...req.body,
                id: uuidv4(),
            }
            notes.push(newNoteObj);
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2) ,(err, data) => {
                if(err){
                    throw err
                }
                else {
                    res.json(notes);
                }
            })
        }
    })
})

// GET request for /notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// WILDCARD GET
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// LISTEN
app.listen(PORT,() => {
    console.log("App listening to " + PORT)
})
