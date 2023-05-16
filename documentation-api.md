# Library-Management | API Documentation

<br>

## Table of Contents
[Base URL](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#base-url)  

[Endpoints](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#endpoints)
  * [Books](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#books)
  * [Borrowers](https://github.com/ilyaKarachun/library-management/blob/main/documentation-api.md#borrowers)

<br>

## Base URL

    http://localhost:3000/

<br>

## Endpoints

The following endpoints are available for requests. 

Client must be authenticated to make any request. 

All responses are in JSON format.

### Books:

- `POST /books` - Add new book.
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
        { message: "Book created" }

        Other possible HTTP Status: 
          401 Unauthorized,
          422 Unprocessable Entity,
          500 Internal Server Error

- `GET /books/id/:isbn` - Get book by ISBN.  
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | isbn          | 9788478884452 |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
            "ISBN": "9788478884452",
            "title": "Harry Potter",
            "author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
            }
            "year": 1999
            "isAvailable": true
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          422 Unprocessable Entity, 
          500 Internal Server Error

- `GET /books/title/:title` - Get book by Title.  
  - Request:

      | Path Variable | Value Example |
      | ------------- | ------------- |
      | title         | Harry Potter  |

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        {
            "ISBN": "9788478884452",
            "title": "Harry Potter",
            "author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
            }
            "year": 1999
            "isAvailable": true
        }

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          422 Unprocessable Entity, 
          500 Internal Server Error

- `GET /books` - Get all books.  
  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        [
          {
            "ISBN": "9788478884452",
            "title": "Harry Potter",
            "author": {
                "firstName": "J.K.",
                "lastName": "Rowling"
            }
            "year": 1999
            "isAvailable": true
          },
          ...
        ]

        Other possible HTTP Status: 
          401 Unauthorized,
          404 Not found, 
          500 Internal Server Error

- `PUT /books` - Update book.  
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
            "isAvailable": true
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Book updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          422 Unprocessable Entity,
          500 Internal Server Error

- `PUT /books/availability` - Update book's availability.  
  - Request:

        Request-Body:
          {
            "ISBN": "9788478884452",
            "isAvailable": false
          }

  - Response:
    
        HTTP Status: 200 OK
        Content-Type: application/JSON
        { message: "Book availability updated" }

        Other possible HTTP Status: 
          401 Unauthorized,
          422 Unprocessable Entity,
          500 Internal Server Error

- `DELETE /books/:isbn` - Delete book by ISBN.  
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
          422 Unprocessable Entity, 
          500 Internal Server Error

<br>

### Borrowers: