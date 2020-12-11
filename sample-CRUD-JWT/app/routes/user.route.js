const express =  require('express');
const userRouter = express.Router();

const path =require('path');
const getPath=path.join(__dirname,'../controller/user.controller');
const userController = require(getPath)

userRouter.get('/getAllData', userController.getAllData);
userRouter.post('/addNewData' , userController.addNewData);
userRouter.put('/updateData',userController.updateData);
userRouter.delete('/deleteData' , userController.deleteData);

module.exports = userRouter;