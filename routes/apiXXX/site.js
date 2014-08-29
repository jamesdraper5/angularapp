/**************************************************
 This conatains all the main pages in the app
***************************************************/

// Show the home page
exports.index = function(req, res){
  res.render('index', { title: 'This is the Home Page' });
};

// Show the login page
exports.login = function(req, res){
  res.render('login', { title: 'This is the Login Page' });
};

// Show the signup page
exports.signup = function(req, res){
  res.render('signup', { title: 'This is the Signup Page' });
};