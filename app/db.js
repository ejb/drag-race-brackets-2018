const options = {};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://@localhost:5432/rupaul';
const db = pgp(connectionString);

function getAllUsers() {
  return db.any('select * from users')
    .catch(function (err) {
      console.log(err);
    });
}

function checkIfUserExists(googleId) {
  return db.any('select * from users where googleId = googleid')
}

module.exports = {
  getAllUsers
};
