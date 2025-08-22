const express = require('express')
const app = express();
const PORT = 3000;

//Middlewarre untuk parsing JSON 
app.use(express.json());

//Routing
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

//run server 
app.listen(PORT,() => {
    console.log('Server running on http://localhost:${PORT}')
});