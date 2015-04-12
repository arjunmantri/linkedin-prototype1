var mysql = require('mysql');
var mysqlcon;

var connection = mysql.createConnection(
        {
	"host":"sampledb.cy0fkl5xnx4r.us-west-1.rds.amazonaws.com",
        "database":"sampledb",
        "port":3306,
        "username":"root",
        "password":"12345678",
        "reconnect":true,
        "data_source_provider":"rds",
        "type":"mysql"
        });


exports.getConnection = function()
{
    /*if(connection.threadId != null)
    {
        console.log("MYSQL connection object :" + connection.threadId);
    }
    else
    {
        connectToMySql();
    }*/
    
    connectToMySql();
    
    return connection;
}
 

var connectToMySql = exports.connectToMySql = function(){
    
    connection.connect(function(err) {
          if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
            console.log('connected to mysql as id ' + connection.threadId);
          
});
    
}


//module.exports = connection;
