
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "../../../db/db.json", "utf8", function (
      error,
      data
    ) {
      if (error) {
        return console.log(error);
      }
      console.log("Notes", data);
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "../../../db/db.json", "utf8", function (
      error,
      notes
    ) {
      if (error) {
        return console.log(error);
      }
      notes = JSON.parse(notes);

      let id = notes[notes.length - 1].id + 1;
      const newNote = { title: req.body.title, text: req.body.text, id: id };
      const activeNote = notes.push(newNote);

      fs.writeFile(
        __dirname + "../../../db/db.json",
        JSON.stringify(activeNote),
        function (error, data) {
          if (error) {
            return error;
          }
          console.log(activeNote);
          res.json(activeNote);
        }
      );
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    const noteId = JSON.parse(req.params.id);
    console.log(noteId);
    fs.readFile(__dirname + "../../../db/db.json", "utf8", function (
      error,
      notes
    ) {
      if (error) {
        return console.log(error);
      }
      notes = JSON.parse(notes);

      notes = notes.filter((val) => val.id !== noteId);

      fs.writeFile(
        __dirname + "../../../db/db.json",
        JSON.stringify(notes),
        function (error, data) {
          if (error) {
            return error;
          }
          res.json(notes);
        }
      );
    });
  });
};
