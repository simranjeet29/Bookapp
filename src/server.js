const exp = require('express');
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');
require('./database/mongoconnection');

const app = exp();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
  name: 'bookstore',
  saveUninitialized: false,
  resave: true,
  secret: 'webapp',
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
}));
app.use('/', require('./routes/homeapi'));
app.use('/author', require('./routes/authorsapi'));
app.use('/books', require('./routes/booksapi'));
app.use(['/', 'registration'], require('./routes/registration'));
app.use(['/', 'search'], require('./routes/searchapi'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/css', exp.static('css'));

app.get('/about', (request, response) => {
  console.log('about');
  const usersession = request.session;
  response.render('about', { usersession });
});

app.listen(process.env.port, (err) => {
  if (err) { throw err; } else { console.log(`listening on port ${process.env.port}`); }
});
