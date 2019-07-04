const router = require('express').Router();
const req = require('request');
const mid = require('./middleware');

router.get('/search', mid.redirectlogin, (request, response) => {
  console.log('search');
  const usersession = request.session;
  response.render('./../views/search', { usersession });
});

router.post('/search', async (request, response) => {
  console.log('search book');
  const usersession = request.session;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${request.body.search}`;
  url += process.env.googledevkey;
  req(url, (error, res, body) => {
    if (error) { throw (error); }
    const books = JSON.parse(body);
    response.render('./../views/book-search', { books, usersession });
  });
});
module.exports = router;
