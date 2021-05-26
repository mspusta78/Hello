var http = require('http'); // Import Node.js core module

// var server = http.createServer(function (req, res) {   //create web server
//     if (req.url == '/') { //check the URL of the current request
                
//         // set response header
//         res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
//         // set response content    
//         res.write('<html><body><p>This is home Page.</p></body></html>');
//         res.end();    
//     }
//     else if (req.url == "/student") {            
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<html><body><p>This is student Page.</p></body></html>');
//         res.end();

//     }
//     else if (req.url == "/teacher") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<html><body><p>This is teacher Page.</p></body></html>');
//         res.end();

//     }
//     else{
//         res.end('Invalid Request!');
//     }
// });

// server.listen(5000); // listen for any incoming requests

// console.log('Node.js web server is running at http://127.0.0.1:5000 ')



var express = require('express');
var app = express();

// define static files
app.use(express.static('public'));

// define routes here..
// app.get('/', function (req, res) {
//     res.send('<html><body><h1>Hello World</h1></body></html>');
// });

// respond with "hello world" when a GET request is made
app.get('/', function (req, res, next) {
    console.log("The response will be sent by the next function")
    next()
}, function (req, res) {
// res.send('Hello World!')

var objUser = {
    displayName : "Martin Spusta",
    location : "California"
}
res.json(objUser)

})


var server = app.listen(5000, function () {
    console.log('Express.js Web server is running at http://127.0.0.1:5000');
});