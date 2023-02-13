const fs = require("fs");
const path = require("path");
const express = require("express");


const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});
app.get("/", function (req, res) {
  res.send(
    "<form action='/store-user' method='POST'><label>Your Name</label><input type='text' name='username'><button>Submit</button></form>"
  );
});
app.post("/store-user", function (req, res) {
  const userName = req.body.username;

  //We declare the absolute path to where we will save the username
  const filePath = path.join(__dirname, "users.json");
  //We read the file we just specified
  const fileData = fs.readFileSync(filePath);
  //We parse (turn into js object) the data in the file
  const existingUsers = JSON.parse(fileData);

  //We add a new username into the parsed object
  existingUsers.push(userName);

  //We turn the object into raw text again and write it into the file
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  
  let responseData = '<ul>';

  for(const user of existingUsers) {
    responseData += '<li>' + user + '</li>';
  }
  responseData += '</ul>';
  
  res.send(responseData);

});

app.listen(3000);
