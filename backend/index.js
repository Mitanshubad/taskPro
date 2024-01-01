const express = require("express");
const connectToMongo = require("./db");

var cors = require("cors");
var app = express();

app.use(express.json());
app.use(cors());
connectToMongo();

const port = 5000;

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`);
});
