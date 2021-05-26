var fs = require('fs');
fs.readFile('helloworld.txt', function (err, data) {
    if (err) {
      console.log(err)
    }
    console.log("Asynchronous read: " + data.toString());
});

