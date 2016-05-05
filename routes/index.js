/*
 * GET home page.
 */

var fs = require('fs');
var path = require('path');
var traffic = require('./traffic');

exports.index = function(req, res) {
	traffic.trafficupdate();
	res.render('index', {
		title : 'ParkWiz'
	});
};

exports.abc = function(req, res) {
	traffic.trafficupdate();
	res.render('Carousel', {
		title : 'ParkWiz'
	});
};

exports.dashboard = function(req, res) {
	traffic.trafficupdate();
	res.render('dashboard', {
		title : 'ParkWiz'
	});
};

exports.reviews = function(req, res) {
	traffic.trafficupdate();
	res.render('reviews', {
		title : 'ParkWiz'
	});
};

exports.availability = function(req, res) {
	traffic.trafficupdate();
	res.render('availability', {
		title : 'ParkWiz'
	});
};

exports.images = function(req, res) {
	traffic.trafficupdate();
	res.render('images', {
		title : 'ParkWiz'
	});
};

exports.addlisting = function(req, res) {
	traffic.trafficupdate();
	res.render('addlisting', {
		title : 'ParkWiz'
	});
};

exports.profile = function(req, res) {
	traffic.trafficupdate();
	res.render('profile', {
		title : 'ParkWiz'
	});
};

exports.payment = function(req, res) {
	traffic.trafficupdate();
	res.render('payment', {
		title : 'ParkWiz'
	});
};

exports.bookings = function(req, res) {
	traffic.trafficupdate();
	res.render('bookings', {
		title : 'ParkWiz'
	});
};

exports.bookingoverview = function(req, res) {
	traffic.trafficupdate();
	res.render('bookingoverview', {
		title : 'ParkWiz'
	});
};

exports.bookinghistory = function(req, res) {
	traffic.trafficupdate();
	res.render('bookinghistory', {
		title : 'ParkWiz'
	});
};

exports.mylisting = function(req, res) {
	traffic.trafficupdate();
	res.render('mylisting', {
		title : 'ParkWiz'
	});
};

exports.panaroma = function(req, res) {
	traffic.trafficupdate();
	res.render('panaroma', {
		title : 'ParkWiz'
	});
};

exports.details = function(req, res) {
	traffic.trafficupdate();
	res.render('details', {
		title : 'ParkWiz'
	});
};

exports.uploadimage = function(req, res) {
	traffic.trafficupdate();
	res.render('uploadImage', {
		title : 'ParkWiz'
	});
};

exports.search = function(req, res) {
	traffic.trafficupdate();
	res.render('search', {
		title : 'ParkWiz'
	});
};

exports.myaccount = function(req, res) {
	traffic.trafficupdate();
	res.render('myaccount', {
		title : 'ParkWiz'
	});
};

exports.bookinghistory = function(req, res) {
	traffic.trafficupdate();
	res.render('bookinghistory', {
		title : 'ParkWiz'
	});
};

exports.billing = function(req, res) {
	traffic.trafficupdate();
	res.render('billing', {
		title : 'ParkWiz'
	});
};

/*
 upload image
 */
exports.upload = function(req, res) {
	fs.readFile(req.files.upl.path, function(err, data) {
		var name = req.files.upl.name;
		if (!name) {
			console.log("error no files has been selected");
		} else {
			var newPath = path.join(__dirname, '../public/images/uploaded/') + name;
			fs.writeFile(newPath, data, function(err) {
				if (err) {
					throw err;
				} else {
					console.log("File saved");
				}
			});
		}
	});

};
