//串口通信
var SerialPort = require('serialport');

var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = 'mongodb://localhost:27017/weatherDB';
var app = express();

//获取客户端信息
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//跨域处理
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//连接数据库
var insertData = function(db, callback, data) {
    //连接到表 site
    var collection = db.collection("aqi");
    //插入数据
    collection.insert(data, function(err, result) {
        if(err) {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
};

var port = new SerialPort(
    "COM3", {
        baudRate: 9600,  //波特率
        dataBits: 8,    //数据位
        parity: 'none',   //奇偶校验
        stopBits: 1,   //停止位
        flowControl: false,
        autoOpen: false
    });

port.open(function (error) {
    if (error) {
        console.log("打开端口错误：" + error);
    } else {
        console.log("打开端口成功，正在监听数据中...");
        port.on('data', function (data) {
            console.log(new Date());
            // console.log(data);
            var quality = [(data[2] + data[3] * 256) / 10, (data[4] + data[5] * 256) / 10];
            // console.log(array);
            var AQI = {
                "time": new Date().getTime(),
                "PM2_5": quality[0],
                "PM10": quality[1]
            };
            console.log(AQI);
            MongoClient.connect(DB_CONN_STR, function(err, db) {
                console.log("连接成功！");
                insertData(db, function(result) {
                    console.log(result);
                    db.close();
                }, AQI);
            });
        })
    }
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message);
});



