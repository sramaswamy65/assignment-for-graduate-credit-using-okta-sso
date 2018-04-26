var express = require('express');
var path = require('path');  // For setting the static dir
var url = require('url');
var bodyparser = require('body-parser'); // for parsing form data
var bookreviews = require('./routes/bookreviews');
var api = require('./routes/api');
var mongoose = require('mongoose'); // For setting up model framework

const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

require('dotenv').config();

// Connect to our database
var uri = 'mongodb://' + process.env.DB_USER+ ':'
          +process.env.DB_PWD
          +'@cluster0-shard-00-00-ersfm.mongodb.net:27017,cluster0-shard-00-01-ersfm.mongodb.net:27017,cluster0-shard-00-02-ersfm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// Use promise to connect to mongodb
mongoose.connect(uri)
    .then(()=> { console.log('DB Connection Successful'); } )
    .catch((err)=> console.error(err));

// Setup the application
var app = express(); 
app.set('views', path.join(__dirname, 'views'));

// Use pug as template engine
app.set('view engine', 'pug');

var jsonParser = bodyparser.json();
var urlencodedParser  = bodyparser.urlencoded({extended: false});


app.use(session({
  cookie: { httpOnly: true },
  secret: "long random string"
}));

app.use('/bookreviews', urlencodedParser, bookreviews);
app.use('/api', jsonParser, api);


app.use(express.static(path.join(__dirname, 'public')));
app.use('/bookreviews', bookreviews); 

// If all else fails, log the error
app.use((req,res,next) => {
    res.status(404);
    res.send("Sorry, this file cannot be found");
});

/*    issuer: this should be your Org URL value (that you wrote down earlier) with /oauth2/default appended. This is the OAuth2 endpoint that’s used for handling authorization.
    client_id/client_secret: these values are what you wrote down earlier after creating your Okta Application. They can be found in your Application settings in Okta.
    redirect_uri: this setting tells Okta where to redirect the user after they’ve signed in. This value should stay the same as it is listed above, as this library will handle that route for you automatically.
    routes.callback.default_redirect: this option tells Okta where to redirect a user once they’ve been signed into your website. In this case, you’ll want to redirect them to the dashboard page.
    scope: the OpenID Connect protocol has a lot of standard scopes that determine what data about your user is returned to you once the user has been signed in. The values here provide basic user information for your website. To view a complete list of available scopes, check out this page.
*/
let oidc = new ExpressOIDC({
  issuer: "https://dev-766675.oktapreview.com/oauth2/default",
  client_id: "0oaeu2crctAUZhWzl0h7",
  client_secret: "2i-vRn7EXHmMFYHymGIKpX_nEoVi7aYjRFv09Mvv",
  redirect_uri: "http://localhost:8080/authorization-code/callback",
  routes: {
    callback: { defaultRedirect: "/dashboard" }
  },
  scope: 'openid profile'
});

module.exports = app;
