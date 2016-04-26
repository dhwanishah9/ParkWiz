var mysql = require('./mysql');

exports.availability = function(req, res){
	  res.render('availabilitychart', { title: 'ParkWiz' });
};

exports.getAvailabilityChart = function(req, res){
	var getAvailability = "select reservationid,dayname(startdate) as startday from reservation where startdate>curdate()-30 and spotid="+ req.query.spotid+";"
	console.log("Query is:" + getAvailability);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
		console.log("Error while fetching availability results");
			throw err;
		} else {
			var json = '';
			if (results.length > 0) {
				res.json(results);
							
			} else {
				res.send({"rows":"none"});
			}
		}
	}, getAvailability);
};