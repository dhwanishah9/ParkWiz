var mysql = require('./mysql');
// exports.review = function(req, res){
// 	  res.render('review', { title: 'ParkWiz' });
// };

// exports.getReviews = function(req, res){
	
// 	var getReview = "select r.review,r.rating,concat(u.firstname, ' ', u.lastname) as username from review r,user u where r.userid=u.userid and r.spotid="
// 		+ req.query.spotid+" order by reviewid desc limit 5";
// 	console.log("Query is:" + getReview);
	
// 	//Calling the fetch method using mysql module
// 	mysql.fetchData(function(err, results) {
// 		if (err) {
// 		console.log("Error while fetching review results");
// 			throw err;
// 		} else {
// 			var json = '';
// 			if (results.length > 0) {
// 				res.send({"reviews":results});
// 				//res.json(results);
							
// 			} else {
// 				res.send({"rows":"none"});
// 			}
// 		}
// 	}, getReview);
// };

// exports.getReviewsChart = function(req, res){
	
// 	var getReviewChart = "select rating,count(rating) as ratingcnt from review where spotid="+ req.query.spotid+" group by rating;"
// 	console.log("Query is:" + getReviewChart);
	
// 	//Calling the fetch method using mysql module
// 	mysql.fetchData(function(err, results) {
// 		if (err) {
// 		console.log("Error while fetching review results");
// 			throw err;
// 		} else {
// 			var json = '';
// 			if (results.length > 0) {
// 				res.json(results);
							
// 			} else {
// 				res.send({"rows":"none"});
// 			}
// 		}
// 	}, getReviewChart);
// };


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

