const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://miou-api-default-rtdb.firebaseio.com"
});





app.get('/', (req, res) => {
  const db = admin.firestore();
  const usersCollection = db.collection('pet');

  usersCollection.get()
    .then((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc.data());
      });
      res.json(users);
    })
    .catch((error) => {
      console.error('Error getting users:', error);
      res.status(500).send('Error getting users');
    });
});


app.post('/', (req, res) => {
  // Handle POST request for creating a new user
  // Access the data sent in the request body using req.body
});

// Add more routes as needed

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Default route to handle unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

