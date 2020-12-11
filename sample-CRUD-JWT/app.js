process.env.NODE_ENV=process.env.NODE_ENV || 'dev';
//process.env.NODE_ENV=process.env.NODE_ENV || 'prod';

var config =require('./config/config');
var express=require('./config/express');


var app = express();

app.listen(config.serverConfig.port , (err) => {
  if(err)
console.log('Unable to start the server!')
else
console.log('Server started running on : ' + config.serverConfig.port )
})