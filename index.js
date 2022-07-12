const express = require('express')
const connection = require('./connection/connection')
const config = require('./config/config')
const route = require('./MainRoutes')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
// const mongoose = require('mongoose')
require('express-async-errors')
const middleware = require('./Utils/index')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors')

app.listen(config.port,()=>{
    console.log(`Server is running on ${config.port}`);
})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
// app.use('/static', express.static(path.join(__dirname, './views')));
app.use(cors());
//app.use(multer().array())

app.use('/api/v1', route);

const swaggerOptions = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:"preSchool Api's",
            version:'1.0.0',
            description: "preSchool Api's of Admin Panel",
            contact: {
                name: "Code Brew Pvt",
                email: "gkashyap9602@gmail.com"
            },
        },
        servers:[
            {
                url:"http://localhost:8531/api/v1"
            }
        ],
    },
    apis:["./swagger/swagger.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))

app.use(middleware.middleware.errCreate)
app.use(middleware.middleware.routeErr)




/**
 * @swagger
 * /use:
 *  get:
 *      description: this is to check api work or not
 *      responses:
 *          200:
 *              description: successfull result
 */
 app.get('/use',async function(req,res){
    res.status(200).send('hello')
    })