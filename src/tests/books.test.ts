import supertest from 'supertest';
import { baseUrl, adminCredentials } from './index';
import BookDTO from '../dtos/bookDTO';

let cookie: string;

beforeAll(async () => {
  const response = await supertest(baseUrl)
    .post('/login')
    .send(adminCredentials);
  cookie = response.headers['set-cookie'];
  console.log(cookie, adminCredentials);
});

const newBook = {
  ISBN: '777777777777',
  title: 'title of a book',
  author: { firstName: 'asdad', lastName: 'asdasd' },
  year: 2000,
  isAvailable: true,
};

describe('POST /books', () => {
  it('should create a new book', async () => {
    await supertest(baseUrl)
      .post('/books')
      .set('Cookie', cookie)
      .send(newBook)
      .expect(201);
  });
});

describe('GET /books', () => {
  it('should return an array of books', async () => {
    const response = await supertest(baseUrl)
      .get('/books')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((book: BookDTO) => {
      expect(book).toHaveProperty('_ISBN');
      expect(book).toHaveProperty('_title');
      expect(book).toHaveProperty('_author');
      expect(book).toHaveProperty('_year');
      expect(book).toHaveProperty('_isAvailable');
    });
  })
});

describe('GET /books/:isbn', () => {
  it('should return a book by ISBN in params', async () => {
    const isbn = newBook.ISBN;
    console.log(isbn, newBook)
    await supertest(baseUrl)
      .get(`/books/${isbn}`)
      .set('Cookie', cookie)
      .expect(200);
  });

  it('should return a 404 book not found', async () => {
    const isbn = '1111111111111';

    await supertest(baseUrl)
      .get(`/books/${isbn}`)
      .set('Cookie', cookie)
      .expect(404);
  });
});

describe('PUT /books', () => {
  it('should update a book by ISBN that exists in db', async () => {
    const isbn = newBook.ISBN;
    const updatedBook = {
      ISBN: isbn,
      title: 'Updated Book Title',
      author: { firstName: 'John', lastName: 'Doe' },
      year: 2022,
      isAvailable: true,
    };

    await supertest(baseUrl)
      .put(`/books`)
      .set('Cookie', cookie)
      .send(updatedBook)
      .expect(200);
  });
});

describe('DELETE /books/:isbn', () => {
    it('should delete a book by ISBN', async () => {
      const isbn = newBook.ISBN;
      console.log(isbn, 'deleted')
      await supertest(baseUrl)
        .delete(`/books/${isbn}`)
        .set('Cookie', cookie)
        .expect(204);
    });
  });
