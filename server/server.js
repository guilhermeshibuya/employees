const express = require('express');
const app = express();
const cors = require('cors');
const recordRouter = require('./src/routes/record');
const port = process.env.PORT || 5000;
require('./db/database');

const whitelist = ['http://localhost:3000']
const corsOptions = {
 origin: function (origin, callback) {
    if(!origin){//for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/records', recordRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})