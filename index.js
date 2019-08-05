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

server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  Users.findById(userId)
    .then(userId => {
      res.status(200).json(userId);
    })
    .catch(err => {
      res.status(500).json({ message: 'User w/specified ID doesnt exist' });
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

server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  Users.remove(userId)
    .then(user => {
      res.status(201).json({ message: 'user removed' });
    })
    .catch(err => {
      res.status(500).json({ message: 'error removing user' });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ updated });
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating user' });
    });
});

const port = 8000;
server.listen(port, () => console.log('running on port 8000...'));
