var password = require('password-hash-and-salt');
var mysql = require('./mysql');

exports.signup = function(req, res){
	  res.render('signup', { title: 'ParkWiz' });
};
	
exports.register = function(req, res){
		  res.render('signup', { title: 'ParkWiz' });
};
	
exports.savesignup = function(req, res){
	//Hashing the entered password to store in the DB
	password(req.param("password")).hash(function(error, hash) {
		if(error)
			throw new Error('Error hashing the pwd');
		else{
			hashedPwd = hash;
			//Creating the insert query to save signup data to DB
			var insert = "insert into user (firstname,lastname,email,password,address,phoneno) values ('"
				    + req.param("firstname")
					+ "','"
					+ req.param("lastname")
					+ "','"
					+ req.param("email")
					+ "','"
					+ hashedPwd
					+"','"
					+req.param("address")
					+"','"
					+req.param("phoneno")
					+ "')";
			console.log("Query is:" + insert);
			mysql.insertData(function(err,results) {
				if (err) {
					console.log("Error while inserting into db");
					res.send({"signup":"Not able to signup!!!Try again!!"});
				}
				else{
					var updatedCountVal=1;
					var updateCount = "update user set counter='"+updatedCountVal+"' where email='"+req.param("email")+"'";
					console.log("Query is:" + updateCount);
					mysql.insertData(function(err,results) {
						if (err) {
							console.log("Error while updating counter");
							res.send({"signup":"Signup Failed"});
						}
						else{
							req.session.userid=results.insertId;
							res.send({"signup":"Success"});
						}
					}, updateCount);
					
				}
			}, insert);
		}
	});
	
	
};