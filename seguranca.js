const express = require('express');
const http = require('http');
const rateLimit = require('express-rate-limit');


const routes = require('./routes');


const limit = rateLimit ({ 
  max: 100, // max requisições 
  windowMs: 60 * 60 * 1000,
  message: {message: 'Muitas requisições a partir deste IP, tente novamente após 60 minuto' }
});


const app = express();
const server = http.Server(app)


app.use('/api', limit, routes);


server.listen(process.env.PORT || 3333);