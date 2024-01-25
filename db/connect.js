//mongoose- popular object data modeling library
//Nn0gj4jzFJ2xBCKW
/* working with mongoose -  
        step1: connection - mongoose.connect()
        step2: model- define a schema in model>task.js file - new mongoose.Schema({key:value pairs})
        step3: setting up the model
        step4: module.exports = mongoose.model('name', schemaName)

*/

const mongoose = require('mongoose');
// const connectionString = ''

const connectDB = (url) => {
        
        return mongoose.connect(url)

}

module.exports = connectDB;


//     .then(() => console.log('Connected to the db'))
//     .catch((err) => console.log(err))
// code refactoring...
//we are doing this so that when we are connected to the database only then the server starts listening. without connecting to the database first there is no point of running the server.