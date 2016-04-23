
/*
 * GET users listing.
 */
var mysql = require('./mysql');
exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.getuserinfo = function(userid, res) {
	
	var getUser = "select * from user where userid='"
		+ userid + "'";
	console.log("Query is:" + getUser);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching login results");
			throw err;
		} else {
			// userinfo
			var userinfo = result[0];
			// TODO: create userinfo from result
			res.send(JSON.stringify(userinfo));
		}
	}, getUser);
	
};