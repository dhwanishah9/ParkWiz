
var mysql = require('../routes/mysql');
//var password = require('password-hash-and-salt');
exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.gettopbookings = function(userid, res) {	
	var getBooking = "SELECT CONCAT(s.addressline1, \" \", s.addressline2) AS address, r.status FROM spot s JOIN (SELECT spotid, status, startdate from reservation where userid ="+ userid + ") r WHERE s.spotid = r.spotid ORDER BY r.startdate DESC LIMIT 2";
	console.log("Query is:" + getBooking);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching login results");
			throw err;
		} else {
			// userinfo
			var bookinginfo = result;
			// TODO: create userinfo from result
			res.send(JSON.stringify(bookinginfo));
		}
	}, getBooking);
	
};



exports.getallbookings = function(userid, res) {
	
	var getBooking = "SELECT CONCAT(s.addressline1, \" \", s.addressline2) AS address, r.status FROM spot s JOIN ( SELECT spotid, status, startdate from reservation where userid ='"+ userid + "') r WHERE s.spotid = r.spotid ORDER BY r.startdate DESC";
	console.log("Query is:" + getBooking);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching login results");
			throw err;
		} else {
			// userinfo
			var bookinginfo = result;
			// TODO: create userinfo from result
			res.send(JSON.stringify(bookinginfo));
		}
	}, getBooking);
	
};

/*exports.getspace = function(userid, res) {	
	var getBooking = "SELECT CONCAT(s.addressline1, \" \", s.addressline2) AS address, r.status FROM spot s JOIN (SELECT spotid, status, startdate from reservation where userid ="+ userid + ") r WHERE s.spotid = r.spotid ORDER BY r.startdate DESC LIMIT 2";
	console.log("Query is:" + getBooking);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, result) {
		if (err) {
			console.log("Error while fetching login results");
			throw err;
		} else {
			// userinfo
			var bookinginfo = result;
			// TODO: create userinfo from result
			res.send(JSON.stringify(bookinginfo));
		}
	}, getBooking);
	
};*/
