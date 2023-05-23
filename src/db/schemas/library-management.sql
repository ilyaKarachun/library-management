DROP DATABASE IF EXISTS library_management;
CREATE DATABASE library_management;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(256) NOT NULL UNIQUE,
    hashed_pass char(97) NOT NULL
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL
);

CREATE TABLE books (
    ISBN char(13) PRIMARY KEY,
    title varchar(100) NOT NULL,
    author_id integer NOT NULL,
    publication_year smallint NOT NULL,
    is_available boolean NOT NULL DEFAULT true,
    CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE RESTRICT
);

CREATE TABLE borrowers (
    borrower_id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(256) NOT NULL UNIQUE
);

CREATE TABLE books_borrowers (
    borrowing_id SERIAL PRIMARY KEY,
    ISBN char(13) NOT NULL,
    borrower_id integer NOT NULL,
    borrowing_date timestamp DEFAULT NOW(),
    due_date timestamp NOT NULL,
    returned_date timestamp,
    CONSTRAINT fk_ISBN FOREIGN KEY (ISBN) REFERENCES books (ISBN) ON DELETE CASCADE,
    CONSTRAINT fk_borrower_id FOREIGN KEY (borrower_id) REFERENCES borrowers (borrower_id) ON DELETE CASCADE
);

INSERT INTO users (first_name, last_name, email, hashed_pass) VALUES ('Super', 'Admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$e4zmdelJfs8MVbwKHS2F/Q$SqKg6llKogZQQdYVXBqaRkGJlNojvem1y7bWiJZmeLs');