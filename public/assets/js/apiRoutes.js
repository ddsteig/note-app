// Dependencies

const fs = require("fs");
const path = require("path");
const savedNote = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

// Exports Api routes to the app.js

module.exports = function (app) {

  // Responds the database to the page

  app.get("/api/notes", function (req, res) {
    res.json(savedNote);
  });

  // Posts a new note to the database with an id

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    savedNote.push(newNote);
    savedNote.forEach((element) => {
      let noteId = savedNote.length.toString();
      newNote.id = noteId;
    });
    
    fs.writeFile("db/db.json", JSON.stringify(savedNote), function (error) {
      if (error) {
        throw error;
      }
      res.json(savedNote);
    });
  });

  // Deletes a note by way of the note's id

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params;
    for (let i = 0; i < savedNote.length; i++) {
      if (savedNote[i].id === noteId.id) {
        savedNote.splice(i, 1);
      }
    }

    fs.writeFile("db/db.json", JSON.stringify(savedNote), function (error) {
      if (error) {
        throw error;
      }
      res.json(savedNote);
    });
  });
};
