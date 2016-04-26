var mysql = require('./mysql');
exports.review = function(req, res){
	  res.render('review', { title: 'ParkWiz' });
};

exports.getReviews = function(req, res){
	
	var getReview = "select r.review,r.rating,concat(u.firstname, ' ', u.lastname) as username from review r,user u where r.userid=u.userid and r.spotid="
		+ req.query.spotid+" order by reviewid desc limit 5";
	console.log("Query is:" + getReview);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
		console.log("Error while fetching review results");
			throw err;
		} else {
			var json = '';
			if (results.length > 0) {
				res.send({"reviews":results});
				//res.json(results);
							
			} else {
				res.send({"rows":"none"});
			}
		}
	}, getReview);
};

exports.getReviewsChart = function(req, res){
	
	var getReviewChart = "select rating,count(rating) as ratingcnt from review where spotid="+ req.query.spotid+" group by rating;"
	console.log("Query is:" + getReviewChart);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
		console.log("Error while fetching review results");
			throw err;
		} else {
			var json = '';
			if (results.length > 0) {
				res.json(results);
							
			} else {
				res.send({"rows":"none"});
			}
		}
	}, getReviewChart);
};


exports.saveReview = function(req, res){
	//Hashing the entered password to store in the DB
	var insertReview = "insert into review (review,rating,userid,spotid) values ('"
				    + req.param("review")
					+ "',"
					+ req.param("rating")
					+ ","
					+ req.param("userid")
					+ ","
					+req.param("spotid")
					+ ")";
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