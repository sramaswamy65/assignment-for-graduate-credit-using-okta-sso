var express = require('express');
var path = require('path');
var url = require('url');

// Import express-session, which will manage user sessions for this website, and oidc-middleware, which will handle all of the OIDC implementation details for this website

const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
var app = express();

//    cookie.httponly: this option tells the browser that JavaScript code should not be allowed to access the session data. JavaScript on clients is a dangerous thing, ensuring your cookies that contain identity information are safe is always of top importance.
//   secret: this option should be a long random string that you create. It should be the same across all your webservers, but never shared publicly or stored in a public place. This value is used to ensure your user’s identity information is protected cryptographically inside of cookies.

app.use(session({
  cookie: { httpOnly: true },
  secret: "long random string"
}));

app.locals.bookreviews = [];

var bookreviews = require('./routes/bookreviews');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Instantiate the OIDC object that is responsible for the call flowsThe following information is required for this object.

// issuer: this should be your Org URL value (that you wrote down earlier) with /oauth2/default appended. This is the OAuth2 endpoint that’s used for handling authorization.

// client_id/client_secret: these values are what you wrote down earlier after creating your Okta Application. They can be found in your Application settings in Okta.

// redirect_uri: this setting tells Okta where to redirect the user after they’ve signed in. This value should stay the same as it is listed above, as this library will handle that route for you automatically.

// routes.callback.default_redirect: this option tells Okta where to redirect a user once they’ve been signed into your website. In this case, you’ll want to redirect them to the dashboard page.

// scope: the OpenID Connect protocol has a lot of standard scopes that determine what data about your user is returned to you once the user has been signed in. The values here provide basic user information for this website. 

let oidc = new ExpressOIDC({
  issuer: "https://dev-766675.oktapreview.com/oauth2/default",
  client_id: "0oaeu2crctAUZhWzl0h7",
  client_secret: "2i-vRn7EXHmMFYHymGIKpX_nEoVi7aYjRFv09Mvv",
  redirect_uri: "http://localhost:8080/authorization-code/callback",
  routes: {
    callback: { defaultRedirect: "/bookreviews" }
  },
  scope: 'openid profile'
});


// App middleware
app.use("/static", express.static("static"));

app.use(express.static(path.join(__dirname, 'public')));

// App routesa
app.use(oidc.router);

app.use('/bookreviews', bookreviews); 
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/logout", (req, res) => {
  console.log("LOG OUT CALLED");
  req.logout();
  console.log(req.userinfo);
  res.redirect("/");
});


app.use((req,res,next) => {
    res.status(404);
    res.send("Sorry, this file cannot be found");
});

module.exports = app;
