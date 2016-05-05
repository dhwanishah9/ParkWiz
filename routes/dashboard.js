var mysql = require('./mysql');

exports.noofusers = function(req,res) {	
	var getusers = "Select count(userid) from user;";
	console.log("Query is:" + getusers);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results[0]);
			}
		}
	}, getusers);

};

exports.websitetraffic = function(req,res) {	
	var getusers = "Select count from traffic;";
	console.log("Query is:" + getusers);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results[0].count);
			}
		}
	}, getusers);

};


exports.toalsales = function(req,res) {	
	var getsales = "Select count(reservationid) from reservation;";
	console.log("Query is:" + getsales);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results[0]);
			}
		}
	}, getsales);

};




exports.getlowreviewvalues = function(req,res) {	
	var getreviews = "Select concat(s.addressline1,' ',s.addressline2) as address, count(r.spotid) as low from review as r inner join spot as s on r.spotid = s.spotid where r.rating >= 3 group by r.spotid LIMIT 6;";
	console.log("Query is:" + getreviews);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results);
			}
		}
	}, getreviews);

};

exports.gethighreviewvalues = function(req,res) {	
	var getreviews = "Select count(spotid) as high from review where rating < 3 group by spotid LIMIT 6;";
	console.log("Query is:" + getreviews);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results);
			}
		}
	}, getreviews);

};




exports.getpriorityspots = function(req,res) {	
	var getreviews = "Select  concat(s.addressline1,' ',s.addressline2) as address, count(r.spotid) as count from reservation as r inner join spot as s on r.spotid = s.spotid group by r.spotid LIMIT 5;";
	console.log("Query is:" + getreviews);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results);
			}
		}
	}, getreviews);

};
