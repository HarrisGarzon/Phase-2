const db = require('../models/database');

exports.loginPage = (req, res) => {
  res.render('login');
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (err) {
        return res.status(500).send('Error logging in');
      }

      if (user) {
        req.session = { userId: user.id, username: user.username };
        res.redirect('/');
      } else {
        res.status(401).render('login', { error: 'Invalid username or password' });
      }
    }
  );
};

exports.registerPage = (req, res) => {
  res.render('register');
};

exports.register = (req, res) => {
  const { username, password, confirmPassword, description } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).render('register', { error: 'Passwords do not match' });
  }

  db.db.run(
    "INSERT INTO users (username, password, description) VALUES (?, ?, ?)",
    [username, password, description],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).render('register', { error: 'Username already exists' });
        }
        return res.status(500).send('Error registering');
      }

      res.redirect('/auth/login?registered=true');
    }
  );
};

exports.logout = (req, res) => {
  req.session = null;
  res.redirect('/');
};
