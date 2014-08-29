var express = require('express');
var router = express.Router();
//var app = express();



var routes = require('./index');
var login = require('./login');
var signup = require('./signup');
var listing = require('./tableListing');
var table = require('./table');

/*
// Faux database
var users = [
    { name: 'tj' }
  , { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
  , { name: 'bandit' }
];

// Load table by id
app.param('table', function(req, res, next, id){
  console.log( 'req.user: ', req.user );
  console.log( 'id: ', id );
  console.log( 'users[id]: ', users[id] );
  if (req.user = users[id]) {
    next();
  } else {
    next(new Error('failed to find user'));
  }
});

app.get('/table/:id', function(req, res, next){
  res.send('user ' + req.user.name);
});
*/

router.use(function(req, res){
  res.send('path:');
});



// TO DO: put all route definitions into a main router file
router.get('/', routes);
router.get('/login', login);
router.get('/signup', signup);
router.get('/listing', listing);
router.get('/table/:id', table);




/*
*/

module.exports = router;