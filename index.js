const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbmanager = require(__dirname + '/DBManager.js');
const htmlloader = require(__dirname + '/HTMLLoader.js');
const adminmanager = require(__dirname + '/admin/AdminManager.js');

global.key = 1;

// Create Connection
global.db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});
// Connect
global.db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected');
});

const app = express();

//Set Up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create Posts Table
app.get('/createpoststable', dbmanager.createPostsTable);

//Create Subscribers Table
app.get('/createsubscriberstable', dbmanager.createSubscribersTable);

//Delete Subscribers Table
app.get('/deletesubscriberstable', dbmanager.deleteSubscribersTable);

//Get Posts 
app.get('/getposts', dbmanager.getPosts);

//Get Post
app.get('/getpost/:id', dbmanager.getPost);

//Update Post
app.get('/updatepost/:id/:newTitle', dbmanager.updatePost);

//Delete Post
app.get('/deletepost/:id', dbmanager.deletePost);

//Insert Post
app.post('/:loginkey/insertpost', adminmanager.processPostToInserPost);

//Send Message
app.post('/contact', htmlloader.sendMessage)

//Load css
app.use(express.static(__dirname + '/website'));

//Add subscriber to newsletter
app.post('/index', htmlloader.addSubscriber);

app.listen('8080', (req, res) => {
    console.log("server started on port 8080");
});

// Load Page
app.get('/:pageName', htmlloader.loadPage);

// Load Default Page
app.get('', htmlloader.displayIndex);


// Admin Page - All should be in the admin folder, which shoul NOT be fucked with
app.get('/:loginkey/:pagename', adminmanager.processRequest);
