/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

function getFilesInDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
}

const dirPath='./files'

app.get('/files',async(req,res)=>{
  try{
    const files=await getFilesInDirectory(dirPath)

    res.status(200).send(files)
  }
  catch(err){
    res.status(500);
    res.send({'error':err })
  }
  
})

app.get('/file/:filename',async(req,res)=>{
  try{
    const filepath=path.join(dirPath,req.params.filename);
    console.log(filepath);
    const content=await readFile(filepath)
    console.log(content)
    res.status(200).send(content);
  }
  catch(err){
    if(err.code=='ENOENT'){
      res.status(404);
      res.send('File not found')
    }
    else{
      res.status(500);
      res.send({'error':err })
    }
  }
  
})

app.get('*', (req, res)=>{
  res.status(404).send('Route not found');
});
app.post('*', (req, res)=>{
  res.status(404).send('Route not found');
});
app.put('*', (req, res)=>{
  res.status(404).send('Route not found');
});
app.delete('*', (req, res)=>{
  res.status(404).send('Route not found');
});

// app.listen(3000,()=>{
//   console.log("listensing to port",3000)
// });

module.exports = app;