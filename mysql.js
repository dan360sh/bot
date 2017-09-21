var mysql = require('mysql');
var client = mysql.createClient();
client.host='127.0.0.1';
client.port= '3306';
client.user='someuser';
client.password='userpass';
client.database='node';
client.query('create table newtable(id INT,name VARCHR)', function(error, result, fields){
    console.log(result);
});
client.end();