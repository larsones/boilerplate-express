let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');


// Section 4 Serving Static Assets
app.use("/public", express.static(__dirname+ "/public"));
/*Section 7 Implementing a Root-level request Logger MiddleWare*/
app.use((req, res, next) => {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});
//Section 11 Use body-parser to Parse POST requests
app.use(bodyParser.urlencoded({extended: false}));


/*Section 8 implementing a chain middle ware to create a time server*/
app.get('/now', (req,res,next) => {
    req.time = new Date().toString(); 
    next();
}, (req, res) => {
    res.json({"time":req.time});
});
//Section 9 Get Route Parameter input from client
app.get("/:word/echo", (req, res, next) => {
    res.json({"echo": req.params.word});
});
//Section 10 Get Query parameter input from client 
app.get("/name", (req, res, next) => {
    var string = new String(req.query.first + " " + req.query.last);
    res.json({"name": string});
})
//Section 12 Get Data from Post Requests
app.post("/name", (req,res,next) => {
    var string = new String(req.body.first + " " + req.body.last);
    res.json({"name": string});
})

app.get("/", (req, res) => {
    //res.send("Hello Express");
    res.sendFile(__dirname+ "/views/index.html");
});





//Section 6 utalizing a .env file to set rules
app.get("/json", (req, res) => {
    console.log(process.env.MESSAGE_STYLE);
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": "Hello json".toUpperCase()});;
    }
    else{
        res.json({"message": "Hello json"});
    }
});





























 module.exports = app;
