const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://miou-api-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

app.get('/', (req, res) => {
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

app.post('/upload/:userId', (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Default route to handle unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});
