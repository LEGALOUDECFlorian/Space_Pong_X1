require('dotenv').config();
const express = require('express');
const { request } = require('http');


const app = express();

app.use('/', (request, response) => {
  response.send('Good morning Bastard')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Pour le bonheur ? c'est par ici => http://localhost:${port}`)
});