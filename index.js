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
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const findId = req.params.id;

  Users.findById(findId)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({ message: 'bad request' });
  }
  Users.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database',
      });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  Users.remove(userId)
    .then(user => {
      if (user) {
        res.status(201).json({ message: 'User deleted successfully' });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.name || !changes.bio) {
    res
      .status(404)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }

  Users.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(changes);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The user information could not be modified.' });
    });
});

const port = 8000;
server.listen(port, () => console.log('running on port 8000...'));
