import supertest from 'supertest';
import { baseUrl, adminCredentials } from './index';

let cookie: string;

beforeAll(async () => {
  const response = await supertest(baseUrl)
    .post('/login')
    .send(adminCredentials);
  cookie = response.headers['set-cookie'];
  console.log(cookie, adminCredentials);
});

const newBook = {
    ISBN: '1231231271232',
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

describe('return 422 error', ()=>{
    it('should return a 422 error for missing required fields', async () => {
        const borrowingData = {};
    
        await supertest(baseUrl)
          .post('/borrowings')
          .set('Cookie', cookie)
          .send(borrowingData)
          .expect(422);
      });
    
      it('should return a 422 error for a past due date', async () => {
        const borrowingData = {
          ISBN: newBook.ISBN,
          borrowerId: '123',
          dueDate: '2021-01-01',
        };
    
        await supertest(baseUrl)
          .post('/borrowings')
          .set('Cookie', cookie)
          .send(borrowingData)
          .expect(422);
      });
    
})
  