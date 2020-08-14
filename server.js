const express = require('express');
const mongoose = require('mongoose');
const app = express();
const devices = require('./routes/devices')

mongoose.connect('mongodb://localhost/devices', { useNewUrlParser: true, useUnifiedTopology: true })

const dataBase = mongoose.connection
dataBase.on('error', function(error){
    console.log(error);
})
dataBase.once('open', function(){
    console.log('connected to database')
})

app.set('view engine', 'ejs')
app.use(express.json()) // server accept json

const devicesRouter = require('./routes/devices')
app.use('/devices', devicesRouter)

app.listen(3000, function(){
    console.log('3 2 1 server started...')
})

// app.use('/devices', devices)

// app.get('/', function(req,res){
//     res.render('index', {devices: devices})
// })