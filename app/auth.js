// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '154943751777144', // your App ID
        'clientSecret'  : process.env.FBSECRET, // your App Secret
        'callbackURL'   : 'http://localhost:3003/auth/facebook/callback'
    }

};

