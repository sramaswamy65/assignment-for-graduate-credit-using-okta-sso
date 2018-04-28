var express = require('express');
var router = express.Router();

const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;


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

router.get("/", oidc.ensureAuthenticated(), (req, res) => 
{

    if (req.isAuthenticated()) {
    console.log('Logged in');
  } else {
    console.log('Not logged in');
  }
    console.log("XXXX INSIDE GET");
    console.log(req.userinfo.name);
    if (req.query.title) {
        res.app.locals.bookreviews.push(
                {title:req.query.title,
                 author:req.query.author,
                 reviewer:req.userinfo.preferred_username,
                 review:req.query.review});
    }                                
    res.render("bookreviewhome", {"bookreviewlist":res.app.locals.bookreviews,  user: req.userinfo });
});

module.exports = router;
