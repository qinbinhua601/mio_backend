const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const hostname = '127.0.0.1'
const port = 3000

// default options
app.use(fileUpload());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./imgs/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})