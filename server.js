const http = require('http');
const express = require('express');
const Session = require('express-session');
const google = require('googleapis');
const plus = google.plus('v1');
 
const app = express();
app.use(Session({
    secret: 'raysources-secret-19890913007',
    resave: true,
    saveUninitialized: true
}));

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;
const RedirectionUrl = "http://localhost:1234/oauthCallback";
function getOAuthClient () {
    return new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, RedirectionUrl);
}
 
function getAuthUrl () {
    const oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/plus.me'
    ];
 
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
 
    return url;
}
 
app.use("/oauthCallback", function (req, res) {
    const oauth2Client = getOAuthClient();
    const session = req.session;
    const code = req.query.code;
    oauth2Client.getToken(code, function(err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if(!err) {
        oauth2Client.setCredentials(tokens);
        session.tokens = tokens;
        res.send(`
            <h3>Login successful!!</h3>
            <a href="/details">Go to details page</a>
        `);
      }
      else{
        res.send(`
            <h3>Login failed!!</h3>
        `);
      }
    });
});
 
app.use("/details", function (req, res) {
    const oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(req.session["tokens"]);
 
    const p = new Promise(function (resolve, reject) {
        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
    })
    .then(function (data) {
        res.send(`
            <img src=${data.image.url} />
            <h3>Hello ${data.displayName}</h3>
        `);
    })
    .catch(err => console.error(err));
});
 
app.use("/", function (req, res) {
    var url = getAuthUrl();
    res.send(`
        <h1>Authentication using google oAuth</h1>
        <a href=${url}>Login</a>
    `)
});
 
 
const port = process.env.PORT || 1234;
const server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
    console.log(`listening to ${port}`);
});
 