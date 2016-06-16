var mysql = require('mysql');
var config = require('../config');
var util = require('util');

var Db = function(conf) {
    var connection = mysql.createConnection(conf);
    function query(query, params) {
        console.log(mysql.format(query, params));
        return new Promise(function(res, rej) {
            connection.query(query, params, (err, rows, fields) => {
                if(err) rej(err);
                else res(rows);
            });
        });
    }
    function get(tableName, cond) {
        var keys = Object.keys(cond)
        .filter(key => cond[key] != undefined && cond[key] != null);
        var values = keys.map(key => cond[key]);

        var sql = util.format('select * from %s where %s', tableName, keys.map(key => key + '=?').join(' and '));

        return query(sql, values);
    }
    function add(tableName, object) {
        var fields = Object.keys(object);
        var values = fields.map(field => object[field]);
        var sql = util.format('insert into %s (%s) values (?)', tableName, fields.join(','));
        return query(sql, [values]).then(res => res.insertId);
    }
    return {
        query: query,
        get: get,
        add: add
    }
};

module.exports = Db(config.mysql);
module.exports.log = Db(config.mysql_log);
