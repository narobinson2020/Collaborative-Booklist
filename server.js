const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database 
connectDB();

//Initialize middlewear 
//app.use(express.json({extended: false})); //this line will allow you to get the data from req.body in your users.js post route 

app.get('/', (req, res) => res.send('API running'));

//Define routes 
//app.use('/api/users', require('./routes/api/users'));
//app.use('/api/auth', require('./routes/api/auth'));
//app.use('/api/profile', require('./routes/api/profile'));
//app.use('/api/lists', require('./routes/api/lists'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));