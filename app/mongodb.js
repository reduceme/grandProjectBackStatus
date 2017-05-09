/*
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/weatherDB';

var delData = function(db, callback) {
    //连接到表
    var collection = db.collection('site');
    //删除数据
    var whereStr = {"aqi":'15'};
    collection.remove(whereStr, function(err, result) {
        if(err) {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
};

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    delData(db, function(result) {
        console.log(result);
        db.close();
    });
});*/

//掺入数据
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/weatherDB';

var insertData = function(db, callback) {
    //连接到表 airController
    var collection = db.collection('airController');
    //插入数据
    var data = [{"controller":"false"}];
    collection.insert(data, function(err, result) {
        if(err) {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
};

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});
