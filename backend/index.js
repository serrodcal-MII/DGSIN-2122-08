var express = require('express');
var path = require('path');
var bp = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;

const BASE_API = "/api/v1";
var mongoNPA_USER = process.env.DB_USER || 'someuser';
var mongoNPA_PASSWORD = process.env.DB_PASS || 'somepassword';
var mongoDB_URI = process.env.DB_URL || 'gsdin2122-08.ya6o4.mongodb.net/gdsin2122-08-db?retryWrites=true&w=majority';
const uri = `mongodb+srv://${mongoNPA_USER}:${mongoNPA_PASSWORD}@${mongoDB_URI}`;

var app = express();

app.use('/', express.static(path.join(__dirname,'public')));
app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));
app.use(cors());

var apartmentsAPI = require('./apartmentsAPI');
var taxesAPI = require('./taxesAPI');

apartmentsAPI.register(app, MongoClient, uri);
taxesAPI.register(app, MongoClient, uri);

// Integrations proxies

var request = require('request');

var proxymwHost = process.env.PROXY_MW || 'https://dgsin-2122-01.herokuapp.com';

// Proxy for minimum-wage
app.use("/proxymw", (req, res) => {
    var url = proxymwHost + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});

// Proxy REST Countries
var urlRestCountries = 'https://restcountries.com/';
app.use("/proxyRestCountries", (req, res) => {
    var url = urlRestCountries + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 8080, () => {
    console.log('The server has started successfully');
}).on('error', (e) => {
    console.log("The server starts failed");
});
