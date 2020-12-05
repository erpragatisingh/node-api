# node-api

CD to your project folder

C:\Users\lp\Documents\sample-CRUD-SQL> npm install

C:\Users\lp\Documents\sample-CRUD-SQL> npm run

Below are basic about your SQL connection details in database/db.js like database name, server details

const config = {
  database: 'api_demo',
  server: 'xxxxxxxxxxx',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
} 

Import postman-colleaction/Node API Demo.postman_collection.json in Postman for varify example using postman

Sample JSON for create user/add new data

URL POST Request type:- http://localhost:3000/api/addNewData

{

    "name": "test user",
     "email" : "test@test.com",
     "password": "test 1"
}


GET Request type for lis of data

URL:- http://localhost:3000/api/getAllData


PUT Request for update password as per per given login in coltriller

URL:- http://localhost:3000/api/updateData

{

    "name": "test use",
     "email" : "test@google.com",
     "password": "password new"
}


DELETE Request type URL for delete a record

UR:- http://localhost:3000/api/deleteData


Example

{    
"name": "test use"
        
}

