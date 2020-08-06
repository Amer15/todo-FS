const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require('./server/routes/todo');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || process.env.NODE_PORT || 5000;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(cors());
}
else{
    app.use(morgan('combined'));
}

mongoose.connect(process.env.MONGODB_URI ,{
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: true
},()=> console.log(`MongoDB connected.`));

app.use('/api/todos', todoRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started at ${PORT}`));