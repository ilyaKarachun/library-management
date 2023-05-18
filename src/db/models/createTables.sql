CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  ISBN VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  author_firstName VARCHAR(255) NOT NULL,
  author_lastName VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  isAvailable BOOLEAN NOT NULL
);
