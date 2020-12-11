const serverConfig={
    port:3000,
    tokenexp:3600,
    secret:'jwtsecretlogin'
}

const databaseConfig= {
  database: 'api_demo',
  server: 'DESKTOP-51JVSDN',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
} 

module.exports ={
    serverConfig,
    databaseConfig
} 