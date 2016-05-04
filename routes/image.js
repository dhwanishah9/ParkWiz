/**
 * http://usejsdoc.org/
 */
var mysql = require('./mysql');
var result = [];
var temp1 = [];
var temp2 = [];
exports.getAllImages = function(req, res) {

	var getImages = "select * from image where spotid=" + req.query.spotid;
	console.log("Query is:" + getImages);

	mysql.fetchData(function(err, results) {
		if (err) {
			console.log("Error while fetching review results");
			throw err;
		} else {
			if (results) {
				temp1 = [];
				temp2 = [];
				result = [];
				for (var i = 0; i < results.length; i++) {
					if(results[i].imagetype == 1){
						temp1.push(results[i]);
					}
					else if(results[i].imagetype == 0){
						temp2.push(results[i]);
					}
				}
				
				result.push(temp1);
				result.push(temp2);
				res.send(result);
			} else {
				console.log("No image results available");
			}
		}
	}, getImages);
};
