// Dependencies

var express = require("express");

// Sets up the Express App

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
// Route files for html and api files

require("./public/assets/js/apiRoutes")(app);
require("./public/assets/js/htmlRoutes")(app);

// Listener
// The below code effectively "starts" the server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });