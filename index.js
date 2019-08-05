// implement your API here
const express = require('express');
const Users = require('./data/db.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('getting data successfully!');
});

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'err getting list of users' });
    });
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'error adding user' });
    });
});





const port = 8000;
server.listen(port, () => console.log('running on port 8000...'));
