const sql = require('mssql/msnodesqlv8')
const config=require('./config');

const poolPromise = new sql.ConnectionPool(config.databaseConfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}