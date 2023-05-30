const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
    return res.status(200).send('hello world!');
    // Handle GET request for retrieving users
    // You can perform necessary operations and send back the response
  });
  
  app.post('/api/users', (req, res) => {
    // Handle POST request for creating a new user
    // Access the data sent in the request body using req.body
  });
  
  // Add more routes as needed

  const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
