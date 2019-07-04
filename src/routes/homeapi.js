const router = require('express').Router();
const db = require('../database/db');

router.get('/', async (request, response) => {
  const result = await db.query('select * from books');
  const books = result[0];
  const usersession = request.session;
  response.render('index', { books, usersession });
});


module.exports = router;
