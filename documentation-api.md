# Library Management | API Documentation

<br>

## Table of Contents
[Base URL](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#base-url)  

[Authorization](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#authorization)

[Endpoints](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#endpoints)
  * [Authentication](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#authentication)
  * [Users](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#users)
  * [Books](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#books)
  * [Borrowers](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#borrowers)
  * [Borrowings](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#borrowings)

<br>

## Base URL

    http://localhost:3000/

<br>

## Authorization

The system has three possible authorization levels:
1. `Authenticated` - Any logged in User.
2. `User` - Logged in User matching the requested resource's owner user ID.
3. `Admin` - Logged in with Admin credentials: `{ email: admin@gmail.com, password: "admin" }`

<br>

## Endpoints

The following endpoints are available for requests. 

All responses are in JSON format.

<br>

### Authentication:

- `POST /login` - User login.  
  - Request:

        Request-Body:
          {
            "email": "example@gmail.com",
            "password": "password"
          }
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Ok - logged in" }

        Other possible HTTP Status: 
          401 Unauthorized,
          422 Unprocessable Entity,
          404 Not found,
          500 Internal Server Error

- `GET /logout` - User logout.  
  - Authorization required: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Ok - logged out" }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

<br>

### Users:

- `GET /users` - Get all users.  
  - Authorization required: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": [
            {
              "_id": 2,
              "_firstName": "Firstname",
              "_lastName": "Lastname",
              "_email": "example@gmail.com"
            },
            ...
          ],
          "message": "Users retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /users/:id` - Get user by ID.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | id            | 2             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": {
            "_id": 2,
            "_firstName": "Firstname",
            "_lastName": "Lastname",
            "_email": "example@gmail.com"
          },
          "message": "User retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `POST /users` - Create new user.
  - Authorization required: `Admin`
  - Request:

        Request-Body:
        {
          "firstName": "Firstname",
          "lastName": "Lastname",
          "email": "example@gmail.com",
          "password": "123"
        }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        {
          "data": {
            "_id": 2,
            "_firstName": "Firstname",
            "_lastName": "Lastname",
            "_email": "example@gmail.com"
          },
          "message": "User created successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `PUT /users` - Update user.  
  - Authorization required: `Admin` | `User`
  - Request:

        Request-Body:
          {
            "id": 2,
            "firstName": "Firstname",
            "lastName": "Lastname",
            "email": "example@gmail.com"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "User updated successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbbiden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `PUT /users/password` - Update user password.  
  - Authorization required: `Admin` | `User`
  - Request:

        Request-Body:
          {
            "id": 2,
            "oldPassword": "123",
            "newPassword": "456"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Password updated successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbbiden,
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /users/:id` - Delete user by ID.  
  - Authorization required: `Admin` | `User`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | id            | 2             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "User deleted successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          403 Forbidden,
          500 Internal Server Error

<br>

### Books:

- `GET /books` - Get all books.  
  - Authorization required: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "_ISBN": "9785170918814",
            "_title": "Harry Potter",
            "_author": {
              "firstName": "J.K.",
              "lastName": "Rowling"
            },
            "_year": 1999,
            "_isAvailable": true
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /books/borrowed` - Get all borrowed books.  
  - Authorization required: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": [
            {
              "_ISBN": "9785170918814",
              "_title": "Harry Potter",
              "_author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
              },
              "_year": 1999,
              "_isAvailable": false
            },
            ...
          ],
          "message": "Books retrieved succesfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /books/overdue` - Get all overdue books.  
  - Authorization required: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": [
            {
              "_ISBN": "9785170918814",
              "_title": "Harry Potter",
              "_author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
              },
              "_year": 1999,
              "_isAvailable": false
            },
            ...
          ],
          "message": "Books retrieved succesfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /books/id/:isbn` - Get book by ISBN.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | isbn          | 9788478884452 |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "_ISBN": "9785170918814",
          "_title": "Harry Potter",
          "_author": {
            "firstName": "J.K.",
            "lastName": "Rowling"
          },
          "_year": 1999,
          "_isAvailable": true
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /books/title/:title` - Get book by Title.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | title         | Harry Potter  |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "_ISBN": "9785170918814",
          "_title": "Harry Potter",
          "_author": {
            "firstName": "J.K.",
            "lastName": "Rowling"
          },
          "_year": 1999,
          "_isAvailable": true
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `POST /books` - Create new book.
  - Authorization required: `Authenticated`
  - Request:

        Request-Body:
          {
            "ISBN": "9788478884452",
            "title": "Harry Potter",
            "author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
            }
            "year": 1999
          }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        {
          "_ISBN": "9785170918814",
          "_title": "Harry Potter",
          "_author": {
            "firstName": "J.K.",
            "lastName": "Rowling"
          },
          "_year": 1999,
          "_isAvailable": true
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

- `PUT /books` - Update book.  
  - Authorization required: `Authenticated`
  - Request:

        Request-Body:
          {
            "ISBN": "9788478884452",
            "title": "Harry Potter and the Philoshoper's Stone",
            "author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
            }
            "year": 1999
            "isAvailable": true
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "_ISBN": "9785170918814",
          "_title": "Harry Potter and the Philoshoper's Stone",
          "_author": {
            "firstName": "J.K.",
            "lastName": "Rowling"
          },
          "_year": 1999
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

- `DELETE /books/:isbn` - Delete book by ISBN.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | isbn          | 9788478884452 |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Book deleted" }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

<br>

### Borrowers:

- `GET /borrowers` - Get all borrowers.  
  - Authorization required: `Authenticated`
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": [
            {
              "_id": 1,
              "_firstName": "Firstname",
              "_lastName": "Lastname",
              "_email": "borrower@gmail.com"
            },
            ...
          ],
          "message": "Borrowers retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /borrowers/:id` - Get borrower by ID.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | id            | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": {
            "_id": 1,
            "_firstName": "Firstname",
            "_lastName": "Lastname",
            "_email": "borrower@gmail.com"
          },
          "message": "Borrower retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `GET /borrowers/email/:email` - Get borrower by email.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example       |
      | ------------- | ------------------- |
      | email         | borrower@gmail.com  |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": {
            "_id": 1,
            "_firstName": "Firstname",
            "_lastName": "Lastname",
            "_email": "borrower@gmail.com"
          },
          "message": "Borrower retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `POST /borrowers` - Create new borrower.
  - Authorization required: `Authenticated`
  - Request:

        Request-Body:
        {
          "firstName": "Firstname",
          "lastName": "Lastname",
          "email": "borrower@gmail.com"
        }
          
  - Response:
    
        HTTP Status: 201 CREATED
        Content-Type: application/JSON
        {
          "data": {
            "_id": 1,
            "_firstName": "Firstname",
            "_lastName": "Lastname",
            "_email": "borrower@gmail.com"
          },
          "message": "Borrower created successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

- `PUT /borrowers` - Update borrower.  
  - Authorization required: `Authenticated`
  - Request:

        Request-Body:
          {
            "id": 1,
            "firstName": "Firstname",
            "lastName": "Lastname",
            "email": "borrower@gmail.com"
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Borrower updated successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

- `DELETE /borrowers/:id` - Delete borrower by ID.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | id            | 1             |
      
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Borrower deleted successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          500 Internal Server Error

<br>

### Borrowings:

- `GET /borrowings/history` - Get borrowing history for a borrower by borrower ID.  
  - Authorization required: `Authenticated`
  - Request:

      | Query Param | Value Example |
      | ----------- | ------------- |
      | id          | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": [
            {
              "_ISBN": "9785170918814",
              "_borrowerId": 1,
              "_borrowingDate": "2023-05-22",
              "_dueDate": "2023-05-29",
              "_returnedDate": "2023-05-30"
            },
            ...
          ],
          "message": "History retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          422 Unprocessable Entity,
          500 Internal Server Error

- `GET /borrowings/overdue` - Get all in-course borrowings for a borrower by borrower ID.  
  - Authorization required: `Authenticated`
  - Request:

      | Query Param | Value Example |
      | ----------- | ------------- |
      | id          | 1             |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
          "data": [
            {
              "_ISBN": "9785170918814",
              "_borrowerId": 1,
              "_borrowingDate": "2023-05-22",
              "_dueDate": "2023-05-29"
            },
            ...
          ],
          "message": "Due dates retrieved successfully"
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          422 Unprocessable Entity,
          500 Internal Server Error

- `GET /borrowings/availability` - Check book availability.  
  - Authorization required: `Authenticated`
  - Request:

      | Query Param | Value Example  |
      | ----------- | -------------- |
      | isbn        | 9785170918814  |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Book is available" }

        Other possible HTTP Status: 
          401 Unauthorized,
          422 Unprocessable Entity, 
          500 Internal Server Error

- `POST /borrowings` - Borrow a book.
  - Authorization required: `Authenticated`
  - Request:

        Request-Body:
        {
          "ISBN": "9785170918814",
          "borrowerId": 1,
          "dueDate": "2023-05-29"
        }
          
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Book borrowed successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not Found,
          422 Unprocessable Entity,
          500 Internal Server Error

- `PUT /borrowings/:isbn` - Return a book.  
  - Authorization required: `Authenticated`
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | isbn          | 9785170918814 |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Book returned successfully" }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not Found,
          422 Unprocessable Entity,
          500 Internal Server Error