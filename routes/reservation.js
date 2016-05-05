/**
 * http://usejsdoc.org/
 */
var mysql = require('./mysql');

exports.getPrivateParking = function(req, res) {
	//var getParking = "SELECT *, ( 3959 * acos( cos( radians(37.338208) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(37.338208) ) + sin( radians(-121.886329) ) * sin( radians( latitude ) ) ) ) AS distance FROM spot HAVING distance < 10 ORDER BY distance LIMIT 0 , 20";
	var getParking = "SELECT *, ( 3959 * acos( cos( radians("+req.query.latitude+") ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians("+req.query.longitude+") ) + sin( radians("+req.query.latitude+") ) * sin( radians( latitude ) ) ) ) AS distance FROM spot HAVING distance < 10 ORDER BY distance LIMIT 0 , 20";
	console.log("Query is:" + getParking);
	
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching parking details");
			throw err;
		} else {
			console.log("result: "+result);
			res.send(result);
		}
	}, getParking);
	
};

exports.checkPaymentInfo = function(req,res){
	var getPaymentInfo = "select * from payment where user_id="+req.query.userid;
	console.log("Query is:" + getPaymentInfo);
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching parking details");
			throw err;
		} else {
			if(result){
				console.log("Payment Info is not present for this user");
				res.send(false);
			}else{
				console.log("Payment Info is present for this user");
				res.send(true);
			}
		}
	}, getPaymentInfo);
};

exports.getSpotAvailability = function(req,res){
	var getSpotAvailability = "select * from reservation where startdate=' "+req.query.searchdate+" 'and spotid="+req.query.spotid;
	console.log("Query is:" + getSpotAvailability);
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching parking details");
			throw err;
		} else {
			console.log("result: "+result);
			res.send(result);
		}
	}, getSpotAvailability);
};
	
