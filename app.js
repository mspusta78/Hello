var http = require("http");

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

var myLogModule = require('./Log.js');

//myLogModule.info('Node.js is awesome!');

var msg = require('./TextMessage.js');
msg.log('Hello World');

//console.log(msg.SimpleMessage);




//console.log(msg);

// function DisplayName(nameValue) { 
//     console.log(nameValue);
// }

// DisplayName("Martin Spusta")

// console.log(global.globalString);

// console.log("Let's add some new cool feature")