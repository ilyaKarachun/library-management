# Library Management Project

Library management system that allows users to manage books, borrowers and borrowing transactions. Built using Express and PostgreSQL and developed for Solvd Node Js Development Course.

<br>

## Table of Contents
- [Installing this Project](https://github.com/ilyaKarachun/library-management#installing-this-project)

- [User Functionalities](https://github.com/ilyaKarachun/library-management#user-functionalities)

- [OAuth 2.0 Authorization Protocol](https://github.com/ilyaKarachun/library-management#oauth-20-authorization-protocol)  

- [API Documentation](https://github.com/ilyaKarachun/library-management#api-documentation) 

- [Database Documentation](https://github.com/ilyaKarachun/library-management#database-documentation)

- [Built With](https://github.com/ilyaKarachun/library-management#built-with)

<br>

## Installing this Project

You can clone the repository. Cloning will give you a copy of the project on
your local machine for development and testing purposes. You must have npm and Docker installed in your computer.

Instructions:

1- Clone the repo

    git clone https://github.com/ilyaKarachun/library-management.git

2- Run the following command in the terminal in project's root directory

    docker-compose up --build

3- You will now be able to access it at localhost:3000

    http://localhost:3000/

<br>

## User Functionalities

The system will be used by the library managers (Users). It provides the following functionalities:

### ◻ Book Management
- Add new books to the library with details like ISBN, title, author and publication year.
- Update book information and availability status.
- Remove books from the library.

### ◻ Borrower Management
- Register borrowers with details like membership ID, name and contact information.
- Update borrower information.
- Remove borrowers from the system.

### ◻ Borrowing Transactions:
- Allow borrowers to borrow books from the library.
- Handle book availability and checkouts.
- Track borrowing history and due dates.
- Allow borrowers to return books.

### ◻ Reports:
- Generate reports such as a list of all books in the library, borrowed books, overdue books, and borrower records.

<br>

## OAuth 2.0 Authorization Protocol

This system implements the OAuth 2.0 authentication flow.

### OAuth 2.0 Flow
1. The User fills a login form with his credentials (`email` and `password`).  

2. The Client sends an authentication request with User's credentials to the following API's endpoint: `http://localhost:3000/login`.  
3. The Server authenticates the User and generate a pair of Tokens (`Access Token` and `Refresh Token`). Token's value is an uuid random string. Access Token has an expiration time of 15 minutes. Refresh Tokens has an expiration time of 6 hours.
4. The Server stores the Tokens in a Redis database, along with the User's `idUser` ID and User's `isAdmin` role. Finally, the Server sends the Tokens to the Client as HTTP Cookies.  
5. The Client can then use the Access Token to authenticate and make requests to protected resources. If Access Token has expired, the Client can use the Refresh Token to obtain a new pair of Tokens. If Refresh Token has also expired, the Client must authenticate again with the User's login credentials. 

<br>

## API Documentation

To see base URL, available endpoints and all the details about the API documentation, please refer to [documentation-api.md](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md) file.

<br>

## Database Documentation

To see Entity-Relationship Diagram, tables, relationships and all the details about the database documentation, please refer to [documentation-database.md](https://github.com/ilyaKarachun/library-management/blob/main/documentation-database.md) file.

<br>

## Built With

  - [Node JS](https://nodejs.org/) - JavaScript runtime environment.
  - [Express](http://expressjs.com/) - Web framework for Node JS.
  - [TypeScript](https://www.typescriptlang.org/) - Typed programming language built on JavaScript.
  - [Docker](https://www.docker.com/) - Used to create docker containers for App and DB services.
  - [PostgreSQL](https://www.postgresql.org/) - SQL relational database used to persist data.
  - [Redis](https://redis.io/) - In-memory database used to store OAuth 2.0 Tokens.
  - [OAuth 2.0](https://oauth.net/2/) - Authorization Protocol.