CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  name varchar(16) NOT NULL UNIQUE,
  password varchar(128) NOT NULL,
  salt varchar(32) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crumps (
  id SERIAL PRIMARY KEY,
  content varchar(400) NOT NULL,
  likes int NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS follows (
  following_id INT NOT NULL REFERENCES users(id),
  follower_id INT NOT NULL REFERENCES users(id),
  PRIMARY KEY(following_id, follower_id)
);
