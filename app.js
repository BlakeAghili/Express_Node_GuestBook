var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');

var app = express();

app.use(logger("dev"));

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var entries = [];
app.locals.entries = entries;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (request, response) {
    response.render("index");
});

app.get("/new-entry", function (request, response) {
    response.render("new-entry")
})

// now a HTTP POST
app.post("/new-entry", function (request, response) {
    if(!request.body.title || !request.body.title) {
        response.status(400).send("Entry is missing a title and a body");
        return;
    }

    entries.push({
        title: request.body.title,
        body: request.body.body,
        published: new Date()
    });

    response.redirect("/");
});

// if we are here, bad
app.use(function(request, response) {
    response.status(404).render("404");
})

http.createServer(app).listen(3000, function () {
    console.log("GuestBook app started on port 3000");
});
