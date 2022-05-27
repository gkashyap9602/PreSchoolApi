const express = require('express')
const connection = require('./connection/connection')
const config = require('./config/config')
const route = require('./MainRoutes')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.listen(config.port,()=>{
    console.log(`Server is running on ${config.port}`);
})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
// app.use('/static', express.static(path.join(__dirname, './views')));
// app.use(cors());
//app.use(multer().array())
app.use('/api', route);
