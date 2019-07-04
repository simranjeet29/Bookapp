const router = require('express').Router();
const req = require('request');
const db = require('../database/db');
const mid = require('./middleware');

router.get('/', mid.redirectlogin, async (request, response) => {
  console.log('books');
  const result = await db.query('select * from books');
  const books = result[0];
  const usersession = request.session;
  response.render('./../views/books', { books, usersession });
});

router.get('/:id', mid.redirectlogin, async (request, response) => {
  console.log('book-details');
  const key = request.params.id * 1;
  const result = await db.query('select * from books where id = ?', [key]);
  const bookdata = result[0];
  const usersession = request.session;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${bookdata[0].name}`;
  url += process.env.googledevkey;
  req(url, (error, res, body) => {
    if (error) { throw (error); }
    const books = JSON.parse(body);
    response.render('./../views/book-detail', { bookdata, usersession, books });
  });
});

module.exports = router;
