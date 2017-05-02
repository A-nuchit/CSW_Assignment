// server.js
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(path.join(__dirname, 'public_html')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
//Database setup
// var project = require('./models/project');
var Projects = [{
    "id": 0,
    "stdid": "Jeme Mark",
    "name": "25",
    "score": "+66825458254",
	"adds" : "55 m.8 Phuket 83000",
	"email" : "phuket@hotmail.com"
   },
  {
    "id": 1,
    "stdid": "Ball jark",
    "name": "28",
    "score": "+66825451578",
	"adds" : "45 m.1 Phuket 83100",
	"email" : "love@hotmail.com"
  }

];
var projectIndex = 2;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

// more routes for our API will happen here
// on routes that end in /project

// get all the project (accessed at GET http://localhost:8080/api/project)
router.route('/projects')
  .get(function(req, res) {
    // res.json(project.findAll());
    res.json(Projects);
  });

// create a bear (accessed at POST http://localhost:8080/api/project)
router.route('/projects')
  .post(function(req, res) {
    var project = {};
    project.id = projectIndex++;
    project.stdid = req.body.stdid;
    project.name = req.body.name;
    project.score = req.body.score;
	project.adds = req.body.adds;
    project.email = req.body.email;
    //project.save(bear);
    Projects.push(project);
    res.json({
      message: 'Project created!'
    });
  });

// on routes that end in /project/:project_id
router.route('/projects/:project_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/project/:project_id)
  .get(function(req, res) {
    res.json(Projects[req.params.project_id]);
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/project/:project_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Projects[req.params.project_id].stdid = req.body.stdid; // update the project info
    Projects[req.params.project_id].name = req.body.name; // update the project info
    Projects[req.params.project_id].score = req.body.score;
	Projects[req.params.project_id].adds = req.body.adds;
	Projects[req.params.project_id].email = req.body.email;	// update the project info
    res.json({
      message: 'Project updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/project/:project_id)
  .delete(function(req, res) {
    delete Projects[req.params.project_id]
    res.json({
      message: 'Project deleted!'
    });
  })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//static directory
app.use(express.static('public'))

// use the router and 401 anything falling through
app.use("*", function(req, res) {
  res.status(404).send('404 Not found');
});

// START THE SERVER
// =============================================================================
app.listen(5081, function() {
	console.log("Server is running")
});

