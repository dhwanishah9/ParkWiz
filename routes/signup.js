var password = require('password-hash-and-salt');
var mysql = require('./mysql');
var traffic = require('./traffic');

exports.signup = function(req, res){
	traffic.trafficupdate();
	res.render('signup', { title: 'ParkWiz' });
};
	
exports.register = function(req, res){
	traffic.trafficupdate();
	res.render('signup', { title: 'ParkWiz' });
};
	
exports.savesignup = function(req, res){
	//Hashing the entered password to store in the DB
	password(req.param("password")).hash(function(error, hash) {
		if(error)
			throw new Error('Error hashing the pwd');
		else{
			hashedPwd = hash;
			var mp = Math.floor(Math.random() * (10 - 0) + 0);//FLOOR((CURTIME()/10000)*RAND());
			var pt = Math.floor(Math.random() * (20 - 0) + 0);
			var le = Math.floor(Math.random() * (30 - 0) + 0);
			var lt = Math.floor(Math.random() * (40 - 0) + 0);
			//Creating the insert query to save signup data to DB
			var insert = "insert into user (firstname,lastname,email,password,address,phoneno,monthlypending,pendingtransfer,lifetimeearnings,lifetimetransactions) values ('"
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
					+"','"
					+ mp
					+"','"
					+ pt
					+"','"
					+ le
					+"','"
					+ lt

					+ "')";
			console.log("Query is:" + insert);
			mysql.insertData(function(err,results) {
				if (err) {
					console.log("Error while inserting into db");
					res.send({"signup":"Not able to signup!!!Try again!!"});
				}
				else{
					res.send({"signup":"Success"});
				}
			}, insert);
		}
	});
	
	
};
