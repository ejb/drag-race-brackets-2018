DROP DATABASE IF EXISTS rupaul;
CREATE DATABASE rupaul;

\c rupaul;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  googleid VARCHAR
);

INSERT INTO users (name, googleid)
  VALUES ('Fake User', '000000000000000000000');
