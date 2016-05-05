var mysql = require('./mysql');

exports.getuserlisting = function(req,res,userid, l, o) {	
	var limit = l;
	var offset = o;
	
	var getrecords = "select (select count(r.startdate) from spot as s inner join reservation as r on s.userid = r.userid and s.spotid = r.spotid where s.userid = 21) as Totalrows, r.startdate, r.enddate, r.starttime, r.endtime, concat(s.addressline1,' ',s.addressline2) as address, r.status from spot as s inner join reservation as r on s.userid = r.userid and s.spotid = r.spotid where s.userid = "+userid+" LIMIT "+limit+" OFFSET "+offset+";";
	console.log("Query is:" + getrecords);

	// Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while updating traffic logs");
		} else {
			if (results.length > 0) {
				res.json(results);
			}
		}
	}, getrecords);

};