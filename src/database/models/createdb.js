const mysql = require('mysql2/promise');

async function localconnection() {
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    connectionLimit: 10,
    queueLimit: 0,
  });
  await connection.query('CREATE DATABASE bookapp');
  connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'bookapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  let sql = 'CREATE TABLE books(id INT,name VARCHAR(100), author VARCHAR(100), img VARCHAR(80), des VARCHAR(100))';
  await connection.query(sql);
  await connection.query('CREATE TABLE author(id int(10),name VARCHAR(100), img varchar(80))');
  // insert in books
  sql = "INSERT INTO `books` (`id`, `name`, `author`, `img`, `des`) VALUES ('1', 'Go Set a Watchman', 'Harper Lee', './../css/img/alchemist.jpg', ' to make a type specimen book.')";
  await connection.query(sql);
  sql = "INSERT INTO `books` (`id`, `name`, `author`, `img`, `des`) VALUES ('2', 'Alchemist', 'Harper Lee', './../css/img/alchemist.jpg', ' to make a type specimen book.')";
  await connection.query(sql);
  sql = "INSERT INTO `books` (`id`, `name`, `author`, `img`, `des`) VALUES ('3', 'Power of Subconcsious Mind', 'Joseph Murphy', './../css/img/alchemist.jpg', ' to make a type specimen book.')";
  await connection.query(sql);
  sql = "INSERT INTO `books` (`id`, `name`, `author`, `img`, `des`) VALUES ('4', 'To Kill Mockingbird', 'Harper Lee', './../css/img/alchemist.jpg', ' to make a type specimen book.')";
  await connection.query(sql);
  // insert in author
  sql = "INSERT INTO `author` (`id`, `name`, `img`) VALUES ('1', 'Harper Lee', 'https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg')";
  await connection.query(sql);
  sql = "INSERT INTO `author` (`id`, `name`, `img`) VALUES ('2', 'Joseph Murphy', 'https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg')";
  await connection.query(sql);
}
localconnection();
