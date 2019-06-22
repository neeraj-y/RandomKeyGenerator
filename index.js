const express = require("express");
const path = require("path");
const generatePassword = require("generate-password");

const app = express();

// server static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // generate random passwords
  const passwords = generatePassword.generateMultiple(count, {
      length: 12,
      uppercase: false
  });

  // return them as JSON
  res.json(passwords);
  console.log(`Sent ${count} passwords`);
});

// the "catch-all" handler: for any request that doesn't match
// one above, send back React's index.html file

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Password generator listening on ${PORT}`);
