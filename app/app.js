var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/weatherDB';
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//跨域处理
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//选择日期查询
app.post('/search', function (req, res, next) {
    console.log(req.body);
    res.end("{time: 123456789,aqi: 20}");
    next();
});

app.listen(3000);