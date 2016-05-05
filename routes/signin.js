var password = require('password-hash-and-salt');
var mysql = require('./mysql');
var traffic = require('./traffic');

exports.signin = function(req, res){
	  traffic.trafficupdate();
	  res.render('signin', { title: 'ParkWiz' });
};




exports.checksignin = function(req, res){
	
	var getUser = "select userid,email,password, cast(case when counter is null then 0 else counter end as unsigned)as counter from user where email='"
		+ req.param("email") + "'";
	console.log("Query is:" + getUser);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
		console.log("Error while fetching login results");
			throw err;
		} else {
			if (results.length > 0) {
				//Entered password compared against the value stored in the DB
			password(req.param("password")).verifyAgainst(results[0].password, function(error, verified) {
				if(error)
					throw new Error('Something went wrong!');
				if(!verified) {
					console.log("Invalid Login");
					res.send({"login":"Invalid Login"});
				} else {
					var tempuserid=results[0].userid;
					var counterVal=parseInt(results[0].counter);
					var updatedCountVal=counterVal+1;
					var updateCount = "update user set counter='"+updatedCountVal+"' where email='"+req.param("email")+"'";
					console.log("Query is:" + updateCount);
					mysql.insertData(function(err,results) {
						if (err) {
							console.log("Error while updating counter");
							res.send({"login":"Login Failed"});
						}
						else{
							req.session.userid = tempuserid;
							console.log("Login Success");
							res.send({"login":"Success"});
						}
					}, updateCount);
					
				}
			});
			}
		}
	}, getUser);
	
};

exports.changepassword = function(req, res){
	var getUser = "select * from user where email='"
		+ req.param("username") + "'";
	console.log("Query is:" + getUser);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
		console.log("Error while fetching login results");
			throw err;
		} else {
			if (results.length > 0) {
				password(req.param("newpwd")).hash(function(error, hash) {
					if(error)
						throw new Error('Error hashing the pwd');
					else{
						hashedPwd = hash;
					    var update = "update user set password='"+hashedPwd+"' where email='"+req.param("username")+"'";
						console.log("Query is:" + update);
						mysql.insertData(function(err,results) {
							if (err) {
								console.log("Error while updating the record.");
								res.send("Password Update Failed!!");
							}
							else {
								res.send("Password Change Successful!!");
							}
						}, update);
					}
				});
			}else{
				res.send("No Such User!!");
			}
		}
	}, getUser);
	
};

