
var secret_config = require('./secret');
var mysql = require('mysql')
    DATABASE = secret_config.federation.db.database,
    client = mysql.createConnection({
        host: secret_config.federation.db.host,
        port: secret_config.federation.db.port,
        user: secret_config.federation.db.user,
        password: secret_config.federation.db.password
    });
var result = client.connect();
client.query('USE ' + DATABASE);

var mysqlUtil = module.exports = {
   seletTable : function (data, res) {
        console.log("seletTable start " + JSON.stringify(data));
        var tableName = data.tableName;
        var fields = data.fields != undefined ? data.fields : '*';
        var whereStr = data.whereStr != undefined ? data.whereStr : '';
        console.log(data);
        if((fields.indexOf('password') != -1) || ((fields.indexOf('*') != -1) && (tableName.indexOf('users') != -1))){
            console.log('break');
            res.end('error');
            return false;
        }
        var queryString = `SELECT ${fields} FROM ${tableName} ${whereStr}`;
        console.log(queryString);

        client.query(queryString, function (error, result, fields) {
            if (error) {
                console.log(error);
                res.end(JSON.stringify(error));
            } else {
                console.log(result);
                res.end(JSON.stringify(result));
            }
        })
    },

    insertUser : function (data, res) {
        console.log("seletTable start " + JSON.stringify(data));
        var phone_number = data.phone_number;
        var password = data.password;
        var login_type = data.login_type;
        var queryString = `INSERT INTO users (phone_number,password,login_type) VALUES('${phone_number}','${password}','${login_type}')`;
        console.log(queryString);
        client.query(queryString, function (error, result, fields) {
            if (error) {
                console.log(error);
                res.end(JSON.stringify(error));
            } else {
                console.log(result);
                res.end(JSON.stringify(result));
            }
        })
    }
};