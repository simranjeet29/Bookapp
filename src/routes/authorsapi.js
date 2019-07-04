const router = require('express').Router();
const db = require('../database/db');

router.get('/', async (request, response) => {
  console.log('author');
  const result = await db.query('select * from author');
  const authors = result[0];
  const usersession = request.session;
  response.render('./../views/author', { authors, usersession });
});

router.get('/:id', async (request, response) => {
  const key = request.params.id;
  const result = await db.query(`select books.id,books.name,author.authorname,books.img from books,author where books.authorid = ${key} and author.id = ${key}`);
  const books = result[0];
  const usersession = request.session;
  response.render('./../views/books', { books, usersession });
});

module.exports = router;
