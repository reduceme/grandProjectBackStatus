var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/weatherDB';
var app = express();

//获取客户端信息
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


//插入数据
/*var insertData = function(db, callback, data) {
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    // var data = [{"time":"1493950256000","aqi":"10"}];
    collection.insert(data, function(err, result) {
        if(err) {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
};*/

//查询指定时间数据
var selectData = function(db, callback, time) {
    //连接到表
    var collection = db.collection("aqi");
    //查询数据
    collection.find(time).toArray(function(err, result) {
        if(err) {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
};

//选择日期查询
app.post('/search', function (req, res, next) {
    var searchData = req.body;
    console.log(searchData);
    // var selectResult = "";
    //插入数据
    /*mongodb.connect(DB_CONN_STR, function(err, db) {
     console.log("连接成功！");
     insertData(db, function(result) {
     console.log(result);
     db.close();
     }, data);
     });*/

    //查询数据
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        selectData(db, function(result) {
            var selectResult = JSON.stringify(result);
            console.log(selectResult);
            db.close();
            res.end(selectResult);
            next();
        }, searchData);
    });

    console.log(selectResult);
    // res.end("{time: 123456789,aqi: 20}");
});

//查询空气净化器状态
var selectAirStatus = function (db, callback) {
    //连接到表
    var collection = db.collection("airController");
    //查询“controller”控制器的状态
    /*collection.find({"_id": "590c198217daf526dcd31c65"}).toArray(function (err, result) {

        if(err) {
            console.log("Error:" + err);
        }
        callback(result);
    })*/

    collection.find({_id: 'ObjectId("590c198217daf526dcd31c65")'}).toArray(function (err, result) {
        if(err) {
            console.log("Error:" + err);
        }
        callback(result);
    });

    // collection.find({}, {"constoller": 1});
};

//查询空气净化器状态
app.get("/get_air", function (req, res, next) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");

        selectAirStatus(db, function(result) {
            /*var selectResult = JSON.stringify(result);
            console.log(selectResult);
            db.close();*/
            // var selectResult = result;
            var selectResult = JSON.stringify(result);
            console.log(selectResult);
            db.close();
            res.end(selectResult);
            next();
        });
    });
});

app.listen(3000);