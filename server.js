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


// POST API endpoint
app.post('/upload:userId', (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  // Store the data in Firestore
  const userRef = db.collection('pet').doc(userId);

  userRef.set(data)
    .then(() => {
      res.send('Data stored successfully');
    })
    .catch((error) => {
      console.error('Error storing data:', error);
      res.status(500).send('Error storing data');
    });
});

// Add more routes as needed

const port = 3000;
const server = app.listen(port, () => {
  const { port } = server.address();
  console.log(`Server listening on port ${port}`);
});

// Default route to handle unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

