import supertest from 'supertest';
import { baseUrl, adminCredentials } from './index';
​
let cookie: string;
​
beforeAll(async () => {
  const response = await supertest(baseUrl)
    .post('/login')
    .send(adminCredentials);
  cookie = response.headers['set-cookie'];
  console.log(cookie, adminCredentials);
});
​
const newBook = {
    ISBN: '3213211233211',
    title: 'title of a book',
    author: { firstName: 'asdad', lastName: 'asdasd' },
    year: 2000,
    isAvailable: true,
  };
​
  const newBorrower = {
    firstName:"name",
    lastName:"surname",
    email:"borrower@gmail.com"
  }
​
  const newBorrowings = {
    ISBN:"3213213213212",
    borrowerId:"1",
    dueDate:"2023-06-01"
}
  
  describe('POST /books', () => {
    it('should create a new book', async () => {
      await supertest(baseUrl)
        .post('/books')
        .set('Cookie', cookie)
        .send(newBook)
        .expect(201);
    });
  });
​
  describe("POST /borrowers", () => {
    const url = "/borrowers"
  
    it("should return 201", async () =>
      supertest(baseUrl)
        .post(url)
        .set("Cookie", cookie)
        .send(newBorrower)
        .expect(201))
  })
​
​
​
  describe('POST /borrowings', ()=>{
    const url = "/borrowings"
​
    it("should create a borrowing" , async()=>{
      supertest(baseUrl)
      .post(url)
      .set("Cookie", cookie)
      .send(newBorrowings)
      .expect(201)
    })
  })
​
describe("GET /borrowings/availability", ()=>{
  const url = `/borrowings/availability?ISBN=${newBook.ISBN}`
​
  it("should return 200 book is avaliable", async ()=>{
    supertest(baseUrl)
    .get(url)
    .set("Cookie", cookie)
    .expect(200)
  })
})
​
describe("GET /borrowings/history", ()=>{
  const url = `/borrowings/history?borrowerId=${newBorrowings.borrowerId}`
​
  it("should return 200 and history of a borrower", async ()=>{
    supertest(baseUrl)
    .get(url)
    .set("Cookie", cookie)
    .expect(200)
  })
})
​
​
describe("GET /borrowings/overdue", ()=>{
  const url = `/borrowings/overdue?borrowerId=${newBorrowings.borrowerId}`
​
  it("should return 200 and overdue of a borrower", async ()=>{
    supertest(baseUrl)
    .get(url)
    .set("Cookie", cookie)
    .expect(200)
  })
})
​
describe("PUT /borrowings/:isbn", ()=>{
  const url = `/borrowings/${newBorrowings.ISBN}`
​
  it("should return 200 Book returned successfully", async ()=>{
    supertest(baseUrl)
    .put(url)
    .set("Cookie", cookie)
    .expect(200)
  })
})
​
​
​
​
​
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
    