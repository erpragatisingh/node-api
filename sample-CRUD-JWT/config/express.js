const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('../app/routes/index')
const app = express()
const authRoute = require('../app/routes/auth.route')
const config = require('../config/config')
var jwt = require('jsonwebtoken');

app.use(cors())

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })


// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//D'fault route
app.get('/', (req, res) => {
  res.send('server is working fine');
});
//Unauthenticated routes

app.use('/api/auth', authRoute);

//JWT token generator
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.serverConfig.secret, function (err, decoded) {
      if (err) {
        // return res.json({​​​​​​​​

        //     message: 'Failed to authenticate token.'
        // }​​​​​​​​);
        return res.status(403).send({ success: false, message:err});
       // return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

app.use("/api", router);


module.exports = function () {
  return app;
}