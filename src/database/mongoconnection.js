const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://bookstore:${process.env.mongopass}@cluster0-smv2r.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});
