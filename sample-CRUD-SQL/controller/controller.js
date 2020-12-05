const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAllData(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(queries.getAllData)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addNewData(req , res){
      try {
        if(req.body.name != null && req.body.email != null && req.body.password != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('user',sql.VarChar , req.body.name)
          .input('email',sql.VarChar , req.body.email)
          .input('password',sql.VarChar,req.body.password)
          .query(queries.addNewUser)
          res.json(result)
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    }
    async updateData(req , res){
      try {
        if(req.body.password != null && req.body.name != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('newPassword',sql.VarChar , req.body.password)
          .input('userName',sql.VarChar,req.body.name)
          .query(queries.updateUserDetails)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteData(req , res){
      try {
        if(req.body.name != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('userName',sql.VarChar,req.body.name)
            .query(queries.deleteUser)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;