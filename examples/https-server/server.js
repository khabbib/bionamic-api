const https = require("https");
const express = require("express");
const app = express();

const fs = require("fs");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/crt", (req, res) => {
    console.log(req.body)   
    res.send({response: 'Hello from server'})
})

const options = {
    key: fs.readFileSync("../../certificate/server.key"),
    cert: fs.readFileSync("../../certificate/server.cert"),
}

https.createServer(options, app).listen(port, console.log(`Server is running on port https://localhost:${port}`))
