const express = require('express');
const app = express();
const tasks  = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config() //invoke the config
const notFound = require('./middleware/not-found');
const errorHandler  = require('./middleware/errorHandler');

//middleware
app.use(express.json());
app.use(express.static('./public'))



//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

// If any of the previous middleware or route handlers (including /api/v1/tasks) calls next(error) with an error object as an argument, the request will skip to the error-handling middleware (errorHandler). This allows you to handle errors centrally.

// If none of the previous middleware or route handlers match the request (i.e., neither /api/v1/tasks nor notFound), the request will also reach the errorHandler middleware if an error occurs during the request processing.

app.get('/', (req,res) => {
    res.send('all working fine');
})
const port = 4000;

//mongoDb
//we are doing this, only when we are connected to the database only then the server starts listening or else we kill it 
//returns a promise so use async and await
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() => console.log('Server is listening on port 4000.'));
    }
    catch(err) {
        console.log(err);

    }
}

start();

