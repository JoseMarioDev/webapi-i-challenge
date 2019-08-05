// implement your API here
const express = require('express');
const users = require('./data/db.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('getting data successfully!');
});



const port = 8000;
server.listen(port, () => console.log('running on port 8000...'));
