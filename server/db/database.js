const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to MongoDB.'))
.catch((err) => console.log(err));