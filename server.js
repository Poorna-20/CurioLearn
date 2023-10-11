const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })); // Replace 'your-secret-key' with a secure secret

// Serve static files from the 'public' directory
app.use(express.static('public'));



// Logout Endpoint
app.post('/logout', (req, res) => {
  // Clear the user's session (logout)
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.sendStatus(200); // Send a success response
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
