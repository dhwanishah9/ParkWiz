var mysql = require('./mysql');
exports.addlistings = function(req, res){
	//Hashing the entered password to store in the DB
	console.log(req.body);
	var insertReview = "insert into listing (user_id,location,parking,garage,description,noofspaces,daily,weekly,monthly,twentyfoursever,shelteredParking,securitygates,arrangedtransfer,allocatedGates,carwash,cctv,securityLighting,securityGuards,securityKey,undergroundPArking,restrooms,instructions) values ('"
				    + "1"
					+ "','"
				    + req.param("location")
					+ "','"
					+ req.param("radio1")
					+ "','"
					+ req.param("radio2")
					+ "','"
					+req.param("description")
					+ "','"
					+ req.param("numberOfSpaces")
					+ "','"
					+ req.param("rental1")
					+ "','"
					+ req.param("rental2")
					+ "','"
					+ req.param("rental3")
					+ "','"
					+ req.param("checkbox1")
					+ "','"
					+ req.param("checkbox2")
					+ "','"
					+ req.param("checkbox3")
					+ "','"
					+ req.param("checkbox4")
					+ "','"
					+ req.param("checkbox5")
					+ "','"
					+ req.param("checkbox6")
					+ "','"
					+ req.param("checkbox7")
					+ "','"
					+ req.param("checkbox8")
					+ "','"
					+ req.param("checkbox9")
					+ "','"
					+ req.param("checkbox10")
					+ "','"
					+ req.param("checkbox11")
					+ "','"
					+ req.param("checkbox12")
					+ "','"
					+ req.param("instructions")
					+ "')";
			console.log("Query is:" + insertReview);
			mysql.insertData(function(err,results) {
				if (err) {
					console.log("Error while inserting into db");
					res.send({"review":"Adding review failed!!"});
				}
				else{
					res.send("Review Added Successfully!!!");
				}
			}, insertReview);
};

