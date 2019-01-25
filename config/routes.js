const axios = require('axios');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14)

  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      db('users')
        .where({
          username: creds.username
        })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ ids, user, token });
        })
    })
    .catch(err => res.status(500).json(err))
}

function login(req, res) {
  const creds = req.body;

  db('users')
    .where({
      username: creds.username
    })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {

        const token = generateToken(user);

        res.status(200).json({
          message: `welcome ${user.username}`,
          token
        });
      } else {
        res.status(401).json({
          you: 'shall not pass!!'
        });
      }
    })
    .catch(err => res.status(500).json({
      err,
      msg: 'no user'
    }));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
