const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const fs = require('fs');



const url = 'mongodb+srv://nitish:nitish9966@cluster0.tsuqmmv.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'Registered_DB'; // Replace with your database name

const client = new MongoClient(url, { useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })); // Replace 'your-secret-key' with a secure secret

// Serve static files from the 'public' directory
app.use(express.static('public'));

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

app.post('/signup', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('users');

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10), // Hash the password
    };

    // Check if the email is already registered
    const existingUser = await collection.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const result = await collection.insertOne(userData);
    // res.status(200).json({ message: 'Signup successful' });
    res.redirect('SignUp_Login/signup_login.html');
    
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Error in signup' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('users');

    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const user = await collection.findOne({ email: email });

    if (user) {
      // Read the main.html file
      fs.readFile('public/index.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading main.html:', err);
          res.status(500).send('Error reading main.html');
        } else {
          // Replace the {{user_name}} placeholder with the user's name
          const modifiedHtml = data.replace('{{user_name}}', user.name);
          res.send(modifiedHtml);
        }
      });
    } else {
      // Handle the case where the user's data is not found
      res.status(404).send('User not found');
    }

    // Verify the password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Login successful
    // res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error in login' });
  }
});

// app.get('/user/:email', async (req, res) => {
//   try {
//     const db = client.db(dbName);
//     const collection = db.collection('users');

//     const email = req.params.email;

//     // Find the user by email
//     const user = await collection.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return user data
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error in retrieving user data:', error);
//     res.status(500).json({ message: 'Error in retrieving user data' });
//   }
// });

// Redirect to the login page with a success message
// app.get('/login', (req, res) => {
//   res.redirect('/login?message=Signup%20successful.%20You%20can%20now%20login.');
//   // res.redirect('/dashboard.html');

// });



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToMongoDB();
});
