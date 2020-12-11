const { sql, poolPromise } = require('../../config/db')
const fs = require('fs');
const path = require('path');
const getPath = path.join(__dirname, '../query/auth.queries.json');
const getHelperPath = path.join(__dirname, '../../helper/helper.js');
var bcryct = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../../config/config')

var authQueries = fs.readFileSync(getPath);
var queries = JSON.parse(authQueries);
var helper = require(getHelperPath);
var serverRes = helper.response;

class MainController {
  async registration(req, res) {
    try {
      let password = req.body.password;
      if (req.body.name != null && req.body.email != null && password != null) {
        const pool = await poolPromise
        const userExistResult = await pool.request()
          .input('name', sql.VarChar, req.body.name)
          .query(queries.getUser)
        if (userExistResult.recordset && userExistResult.recordset.length > 0) {
          res.send('user already registered.');
        } else {
          password = bcryct.hashSync(password, 8);

          const result = await pool.request()
            .input('user', sql.VarChar, req.body.name)
            .input('email', sql.VarChar, req.body.email)
            .input('password', sql.NVarChar, password)
            .query(queries.registration)
          res.json(result)
        }

      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // updateUserSession
  async login(req, res) {
    try {
      if (req.body.name != null && req.body.password != null) {
        const pool = await poolPromise
        const sessionExist = await pool.request()
          .input('name', sql.VarChar, req.body.name)
          .query(queries.getUserSession)

        const userExistResult = await pool.request()
          .input('name', sql.VarChar, req.body.name)
          .query(queries.getUser)
        if (userExistResult.recordset && userExistResult.recordset.length > 0) {
          if (sessionExist.recordset.length <= 3) {
            let user = userExistResult.recordset[0];
            let passwordIsValid = bcryct.compareSync(
              req.body.password,
              user.password
            )
            if (passwordIsValid) {
              let token = jwt.sign({ id: user.name }, config.serverConfig.secret, { expiresIn: 360 })
              // update user session table

              const sessionResult = await pool.request()
                .input('name', sql.VarChar, user.name)
                .input('session_token', sql.NVarChar, token)
                .input('device_id', sql.NVarChar, token)
                .input('login_time', sql.DateTime, new Date())
                .query(queries.updateUserSession)

              // send login success response

              res.send({ message: 'login successfull.', token })
            } else {
              res.send('worng password');
              

            }

          } else {
            res.send({ message: 'please update session token.', token })
          }
        } else {
          res.send('user not found');
        }
      } else {
        res.send('please provide user name and password')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new MainController()
module.exports = controller;