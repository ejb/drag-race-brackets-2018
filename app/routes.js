const google = require('googleapis');
const plus = google.plus('v1');

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;
if (!GOOGLE_CLIENT_ID) {
  throw(`env var GOOGLE_CLIENT_ID missing`)
}
function getOAuthClient (host, encrypted) {
  const protocol = encrypted ? 'https://' : 'http://'
  const redirectionUrl = `${protocol}${host || 'localhost:1234'}/oauthCallback`;
  return new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectionUrl);
}
 
function getAuthUrl (request) {
    const oauth2Client = getOAuthClient(request.headers.host, request.connection.encrypted);
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

const db = require('./db');

module.exports = (app) => {

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
          console.log(err);
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
        db.checkIfUserExists(data.id)
          .then(exists => {
            if (exists) {
              res.send(`
                  <img src=${data.image.url} />
                  <h3>Welcome back ${data.displayName}</h3>
                  <p>id ${data.id}</p>
              `);
            } else {
              db.addUser(data).then(() => {
                res.send(`
                    <img src=${data.image.url} />
                    <h3>Welcome new user ${data.displayName}</h3>
                    <p>id ${data.id}</p>
                `);
              });
            }
          });
      })
      .catch(err => {
        res.send(
          `<a href="/">Return home</a>`
        );
      });
  });
 
  app.use("/", function (req, res) {
      var url = getAuthUrl(req);
      db.getAllUsers().then(users => {
        res.send(`
            <h1>Authentication using google oAuth</h1>
            <p>${users.map(u => u.name).join('<br/>')}</p>
            <a href=${url}>Login</a>
        `);
      }).catch(err => {
        res.send(err);
      });
;
  });
}