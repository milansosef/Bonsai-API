var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

try {
    mongoose.connect('mongodb://localhost:27017/bonsaiAPI', {useMongoClient: true});
} catch (err) {
    console.log('Niet gelukt om met de database te connecten!!', err);
}

var Bonsai = require('./models/bonsaiModel');

var app = express();

var port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bonsaiRouter = require('./Routes/bonsaiRoutes')(Bonsai);

app.use('*', function (req,res,next) {
    if(!req.accepts("application/json")){
        res.status(400).send()
    }
    else {
        next();
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/api/bonsais', bonsaiRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
});