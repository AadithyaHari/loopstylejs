const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var useragent = require('express-useragent');
const mongoose = require('mongoose');


let app = express();

//Routefile importing


var AdminRoute = require("./Routes/adminRoute")
var categoryRoute= require('./Routes/categoryRoute')
var userRoute= require('./Routes/userRoute')
var productRoute = require('./Routes/productRoute')
var cartRoute = require('./Routes/cartRoute');

//BODYPARSER
app.use(bodyParser.urlencoded({
    extended: true, limit: '150mb'
}));
app.use(bodyParser.json({ limit: '150mb' }));

//DATABASE URL
mongoose.connect(process.env.MONGOURL || 'mongodb+srv://aadithyahn:1082002@cluster0.vipovoe.mongodb.net/loopstyle?retryWrites=true&w=majority',
 { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
  console.log("Data Base connected")
}).catch((ex) => {
  console.log("Db connection error")
  console.log(ex)
});

app

//database connection
var db = mongoose.connection;
//Port Declaration
var port = process.env.PORT ||6000 ;




//Cors 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Cors and helmet use
app.use(cors());
app.use(helmet({crossOriginResourcePolicy:false}));

//Consoles the user information and API calls into the server Environment
app.use(useragent.express());
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
})

//function usage

app.use(AdminRoute);
app.use(userRoute);
app.use(categoryRoute);
app.use(productRoute);
app.use(cartRoute);

app.get('/health', async(req, res) => {
    res.status(200).json({
        status: true
    });
    return
});






  

 

  

 
 



   
//Server Environment set up
const server = app.listen(port, function () {
    console.log("Running Server on port " + port);
});
