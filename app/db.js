const options = {};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://@localhost:5432/rupaul';
const db = pgp(connectionString);

function getAllUsers() {
  return db.any('select * from users')
    .catch(function (err) {
      console.log(err);
    });
}

function checkIfUserExists(googleId) {
  return db.any('select * from users where googleId = googleid')
    .then(rows => {
      return rows.length > 0;
    });
}

/*
user = {
  displayName: '',
  id: ''
}
*/
function addUser(user) {
  /*
    TODO: sanitise input
  */
  return db.any(
    `INSERT INTO users (name, googleid)
    VALUES ('${user.displayName}', '${user.id}');`
  )
}


module.exports = {
  getAllUsers,
  checkIfUserExists,
  addUser
};
