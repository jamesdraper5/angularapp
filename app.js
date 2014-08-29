/**************************************************
 This is the bootstrap file for the app
***************************************************/

var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = module.exports = express();

// Routes
var routes = require('./routes'),
    api = require('./routes/api');


// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade');

// middleware
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/bower_components'));

// define any app-wide variables
app.locals.moment = require('moment');


/**************************************************
 Routes
***************************************************/

// General
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//app.get('/login', site.login);
//app.get('/signup', site.signup);


// API
// Tables
app.get('/api/tables', api.tables);
app.get('/api/tables/:id', api.table);

// Users
/*app.all('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);*/

// API - TO DO: organise API calls so that they can be divided - maybe create a specialised router
//app.get('/api/tables', api.table.list);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



if (!module.parent) {
  var port = 5000;
  var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
  });
}
    
