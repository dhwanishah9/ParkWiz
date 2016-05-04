var mysql = require('mysql');
var poolStack = [];
var maxSizeOfPool = 100; 
var myVar = 0;

for(var i = 0; i < maxSizeOfPool; i++){
	var conn = getConnection();
	poolStack.push(conn);
}

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'ec2-52-90-14-74.compute-1.amazonaws.com',
		user     : 'ashoka',
		password : 'ashoka',
		database : 'parkwiz'
	});
	return connection;
}

function getConnectionFromPool(){
	var conn = poolStack.pop();
	return conn;
}

function releaseConnection(conn){
	poolStack.push(conn);
}

function fetchData(callback,sqlQuery){	
	console.log("\nSQL Query::"+sqlQuery);	
	var connection = getConnectionFromPool();
	connection.query(sqlQuery, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, null);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			releaseConnection(connection);
			callback(err, rows);
		}
	});	
}	

function insertData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	var connection = getConnectionFromPool();
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, null);
		}
		else 
		{	releaseConnection(connection);
			callback(err, rows);
		}
	});
}	

exports.fetchData=fetchData;
exports.insertData=insertData;
