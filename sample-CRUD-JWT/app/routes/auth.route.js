const express =  require('express');
const authRouter = express.Router();
const path =require('path');
const getPath=path.join(__dirname,'../controller/auth.controller');
const authController = require(getPath)

authRouter.post('/registration', authController.registration);
authRouter.post('/login' , authController.login);


module.exports = authRouter;