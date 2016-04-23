
/*
 * GET users listing.
 */
var mysql = require('./mysql');
var password = require('password-hash-and-salt');
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

exports.updateuserinfo = function(user, res) {
	
	password(user.password).hash(function(error, hash) {
		if(error)
			throw new Error('Error hashing the pwd');
		else{
			debugger;
			hashedPwd = hash;
			//Creating the insert query to save signup data to DB
			var update = "update user set firstname = '" + user.firstname+"' , lastname = '" + user.lastname + "' , email = '"+ user.email
					+ "' , password = '"+ hashedPwd+"' , address='"+user.address+"',phoneno='"+user.phoneno
					+ "' where userid =" + user.userid ;

			console.log("Query is:" + update);
			mysql.insertData(function(err,results) {
				if (err) {
					console.log("Error while updating db");
					res.send({"update":"Unable to save!!!Try again!!"});
				}
				else{
					res.send({"Update":"Success"});
				}
			}, update);
		}
	});
	
};