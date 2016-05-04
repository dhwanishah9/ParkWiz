var mysql = require('./mysql');
var moment = require('moment');

exports.addPayment = function(req, res){
	//Hashing the entered password to store in the DB
	var payment_id = req.param("user_id") + moment().unix();
	console.log(req.body);
	var insertReview = "insert into payment (paymentid,name,creditcard,cvv,billingaddress,month,year,userid) values ('"
				    + payment_id
					+ "','"
					+ req.param("name")
					+ "','"
					+ req.param("creditcard")
					+ "','"
					+req.param("cvv")
					+ "','"
					+ req.param("address")
					+ "','"
					+ req.param("month")
					+ "','"
					+ req.param("year")
					+ "','"
					+ req.param("user_id")
					+ "')";
			console.log("Query is:" + insertReview);
			mysql.insertData(function(err,results) {
				if (err) {
					console.log("Error while inserting into db");
					res.send({"payment":"Payment not added"});
				}
				else{
					res.send("Card Added Added Successfully!!!");
				}
			}, insertReview);
};

