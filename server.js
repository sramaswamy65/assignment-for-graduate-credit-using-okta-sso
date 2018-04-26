"use strict";

// Import the libraries
const express = require("express");
const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

let app = express();

// App settings
app.set("view engine", "pug");


// App middleware
app.use("/static", express.static("static"));

app.use(session({
  cookie: { httpOnly: true },
  secret: "long random string"
}));



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


// App middleware
app.use("/static", express.static("static"));


/*
The first thing that’s happening above is that you’re using the built-in OIDC routes that ship with the oidc-middleware library. This library provides routes to handle authenticating the user properly (behind the scenes), and a number of other things. I’ll show you how these work soon.

You’ll also notice that your dashboard route is now using a new Node.js middleware: oidc.ensureAuthenticated(). This middleware will do the following:

    If a user tries to visit /dashboard and is not logged in, they will be redirected to Okta to log in, before being allowed to visit the page
    If a user tries to visit /dashboard and they are logged in, they will be allowed to view the page with no problems
*/
// App routesa
app.use(oidc.router);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", oidc.ensureAuthenticated(), (req, res) => {
  console.log(req.userinfo);
  console.log("XXXXXX");
  console.log(req.userinfo.name);
  res.render("dashboard", { user: req.userinfo });
});

app.get("/logout", (req, res) => {
  console.log("XXXXX LOG OUT CALLED");
  req.logout();
  res.redirect("/");
});

oidc.on("ready", () => {
  app.listen(8080);
});

oidc.on("error", err => {
  console.error(err);
});


