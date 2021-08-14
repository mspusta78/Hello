var express = require('express');
var app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./test-81c11-firebase-adminsdk-5hn9q-fd72f75b0c.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

var fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require('cors')({origin: true});
app.use(cors);

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

app.get('/test', function (req, res) {
    async function someFunction() {

       
        console.log("Started Function Execution")
        let result = await myPromise; // wait until the promise resolves 
        console.log("Function resolved " + result)
        console.log("Function Finished")
        res.end
      }
      
    someFunction();
})

app.post('/sendEmail', function(req, res) {
    var nodemailer = require('nodemailer');
    
    const name = req.body.name;
    const email = req.body.email;
    const feedback = req.body.feedback;

    console.log("name=" + name )
    console.log("email=" + email )
    console.log("feedback=" + decodeURI(feedback) )

    var data = {        
        "name": name,        
        "email": email,
        "feedback": decodeURI(feedback)
    }    

    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "e1f761b23b4915",
          pass: "fa286512a8bedd"
        }
    });

    var mailOptions = {
        from: email,
        to: 'martin.spusta@lauruscollege.edu',
        subject: 'Feedback Form',
        text: decodeURI(feedback)
    };
      
    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

            const messageRef = await db.collection('messageLog').add(data);
            res.end( JSON.stringify("Message added", null, 2));
        }
    });


})



app.post('/addUser', function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
    const profession = req.body.profession;
    
    // First read existing users.
    fs.readFile("users.json", 'utf8', function (err, data) {
        var allUsers = JSON.parse(data);

        var newUser = {
            "id": id,
            "name": name,
            "password": password,
            "profession": profession
        }
        allUsers["user4"] = newUser;
         
        fs.writeFile("users.json", JSON.stringify(allUsers, null, 2), function (err){
            if (err) {
                console.log("error writing file")
                res.end( JSON.stringify(err));
            }else{
                console.log("new user added")
                res.end( JSON.stringify(allUsers, null, 2));
            }
        })
        
     });     
 })

app.delete('/deleteUser', function (req, res) {
    const id = req.body.id;
    
    // First read existing users.
    fs.readFile("users.json", 'utf8', function (err, data) {
        var allUsers = JSON.parse(data);        
        
        delete allUsers["user" + id]
         
        fs.writeFile("users.json", JSON.stringify(allUsers, null, 2), function (err){
            if (err) {
                console.log("error writing file")
                res.end( JSON.stringify(err));
            }else{
                console.log("User " + id + " was deleted")
                res.end( JSON.stringify(allUsers, null, 2));
            }
        })
        
     });     
 })

 app.get('/listUsers', function (req, res) {
     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
     });
  })


 
//  const id = req.query.id;
//      const name = req.query.name;
//      const password = req.query.password;
//      const profession = req.query.profession;



//  app.get('/users/:id', async function (req, res) {
//     const usersRef = db.collection('users').doc(req.params.id);
//     const doc = await usersRef.get();
//     if (!doc.exists) {
//       console.log('No such document!');
//       res.end( JSON.stringify("Document not found", null, 2));
//     } else {
//       console.log('Document data:', doc.data());
//       res.end( JSON.stringify(doc.data(), null, 2));
//     }    
//  })

//  {
//      "name": "Martin"
//  }


app.get('/members', function (req, res) {
    var header = req.headers.authorization || '';
    try {
        const token = header.split(/\s+/).pop() || '';     
        var auth = Buffer.from(token, 'base64').toString(); // convert from base64
       
        if (auth !== 'someusername:secretpassword') {
            res.writeHead(401,"WWW-Authenticate");
            res.end('HTTP Error 401 Unauthorized: Access is denied');                     
        }        
        res.end( JSON.stringify("Username/Password is Verified", null, 2));
      } catch(err) {
        // err
        res.end( JSON.stringify(err, null, 2));
      }
});

    // var jwt = require('jsonwebtoken');
    
    // try {
    //     const token = header.split(/\s+/).pop() || '';     
    //     var decoded = jwt.verify(token, 'secretpassword');
    //     res.end( JSON.stringify("Token Verified", null, 2));
    //   } catch(err) {
    //     // err
    //     res.end( JSON.stringify(err, null, 2));
    //   }
// });

// npm install jsonwebtoken

app.delete('/users/:id', async function (req, res) {                
    // Create a reference to the user document
    const usersRef = db.collection('users').doc(req.params.id)
    usersRef.delete();
    res.end( JSON.stringify("User Removed", null, 2));    
 })



 app.post('/users/add', async function (req, res) {        
    const name = req.body.name;    
    const profession = req.body.profession;
    
    // define new user object with passed parameters
    var data = {        
        "name": name,        
        "profession": profession
    }    
    // Create a reference to the users collection
    const usersRef = await db.collection('users').add(data);
    res.end( JSON.stringify("User added", null, 2));
 })

 app.get('/users/all', async function (req, res) {
    // Create a reference to the users collection
    const usersRef = db.collection('users')
    // Get all documents from the collection
    const queryRef = await usersRef.orderBy('name', 'desc').get();
    // loop through each document
    queryRef.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
    
    res.end( JSON.stringify("api finished", null, 2));
 })

 app.get('/users/student', async function (req, res) {
    // Create a reference to the users collection
    const usersRef = db.collection('users')
    // Create a query against the collection
    const queryRef = await usersRef.where('profession', '==', 'student').where('name', '!=', 'John').get();
    // loop through each document
    queryRef.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
    
    res.end( JSON.stringify("api finished", null, 2));
 })

    // const doc = await usersRef.get();
    // if (!doc.exists) {
    //   console.log('No such document!');
    //   res.end( JSON.stringify("No Students found", null, 2));
    // } else {
    //   console.log('Document data:', doc.data());
    //   res.end( JSON.stringify(doc.data(), null, 2));
    // }    


//  app.get('/:id', function (req, res) {
//     // First read existing users.
//     fs.readFile("users.json", 'utf8', function (err, data) {
//        var users = JSON.parse( data );
//        var user = users["user" + req.params.id] 
//        console.log( user );
//        res.end( JSON.stringify(user, null, 2));
//     });
//  })


 
var server = app.listen( process.env.PORT || 5000, function () {
    console.log('Express.js Web server is running at http://127.0.0.1:5000');
});


// define static files
// app.use(express.static('public'));


 // define default route here..
 app.get('/', function (req, res) {
    res.send('<html><body><h1>Hello to RESTful API</h1></body></html>');
});


// http://127.0.0.1:5000/api/users?id=123&name=Martin&password=password123&profession=teacher


// http://127.0.0.1:5000/:id



const myPromise = new Promise((resolve, reject) => {
    try {
        if (Math.random() > 10000) {
            resolve('This is positive number!');
        }
        reject('Negative number');    
    } catch (error) {
        reject(error)
    }        
})



