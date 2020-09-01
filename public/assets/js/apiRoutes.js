const fs = require("fs");
const dataBase = require("../../../db/db.json");


module.exports = function (app) {
  let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  app.get("/api/notes", function (req, res) {
    res.json(dataBase);
  });

  app.get("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
  });

  app.post("/api/notes", function (req, res) {
    
    let newNote = req.body;
    let uniqueID = savedNotes.length.toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(savedNotes), function (error) {
      if (error) {
        throw error;
      }
      res.json(savedNotes);
    })
  });

  app.delete("/api/notes/:id", function (req, res) {
    savedNotes.splice(req.params.id, 1);
    fs.writeFile("db/db.json", JSON.stringify(savedNotes), function (error) {
      if (error) {
        throw error;
      }
    })
  });

  
};
