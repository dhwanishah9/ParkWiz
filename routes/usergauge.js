var mysql = require('./mysql');

exports.gaugechart = function(req, res){
	  res.render('usergaugechart', { title: 'ParkWiz' });
};

exports.getGaugeChart = function(req, res){
	
	var gaugeVal = "select(select count(reservationid) from reservation where userid="+req.query.userid+")as reservcnt ,(select count(spotid) from spot where user_id="+req.query.userid+")as bookingcnt," +
			"(select case when count(userid)=0 THEN 0 ELSE 100 END as cmplete from user where userid="+req.query.userid+") as profilecomplete";
	console.log("Query is:" + gaugeVal);
	
	//Calling the fetch method using mysql module
	mysql.fetchData(function(err, results) {
		if (err) {
		console.log("Error while fetching gauge chart results");
			throw err;
		} else {
			var json = '';
			if (results.length > 0) {
				res.json(results);
				
							
			} else {
				res.send({"rows":"none"});
			}
		}
	}, gaugeVal);
};