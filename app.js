
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  //, user = require('./routes/user')
  , user = require('./Modules/user')
  , booking = require('./Modules/booking')
  , http = require('http')
  , signin=require('./routes/signin')
  , signup=require('./routes/signup')
  , review=require('./routes/review')
  , newlisting=require('./routes/addlistings')
  , availability=require('./routes/availabilitychart')
  , gauge=require('./routes/usergauge')
  , reservation = require('./routes/reservation')
  , image = require('./routes/image')
  , billing=require('./routes/billing')
  , dashboard=require('./routes/dashboard')
  , listing=require('./routes/listing')
  , path = require('path');

var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'parkwizsession', cookie: { maxAge: 180000 }}));

// all environments
app.set('port', process.env.PORT || 5670);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/abc', routes.abc);
app.get('/profile', routes.profile);
app.get('/bookings', routes.bookings);
app.get('/payment', routes.payment);
app.get('/addlisting', routes.addlisting);
app.get('/dashboard', routes.dashboard);


app.get('/bookingoverview', routes.bookingoverview);
app.get('/bookinghistory', routes.bookinghistory);
app.get('/mylisting', routes.mylisting);

app.get('/images', routes.images);
app.get('/availability', routes.availability);
app.get('/reviews', routes.reviews);

app.get('/panaroma', routes.panaroma);
app.get('/details', routes.details);
app.get('/upload', routes.uploadimage);
app.post('/upload', routes.upload);
app.get('/search', routes.search);
app.get('/users', user.list);
app.get('/signin', signin.signin);
app.get('/signup', signup.signup);
app.post('/checksignin', signin.checksignin);
app.post('/savesignup', signup.savesignup);
app.get('/register', signup.register);
app.get('/myaccount', routes.myaccount);
app.get('/bookinghistory', routes.bookinghistory);
app.get('/billing', routes.billing);
app.post('/addPayment', billing.addPayment);

app.post('/resetpassword',signin.changepassword)
app.get('/review', review.review);
app.get('/getallreviews', review.getReviews);
app.get('/getreviewschart', review.getReviewsChart);
app.post('/savereview', review.saveReview);
app.post('/addlistings', newlisting.addlistings);
app.get('/availability',availability.availability);
app.get('/availabilitychart',availability.availability);
app.get('/loadavailabilitychart',availability.getAvailabilityChart);
app.get('/gaugechart',gauge.gaugechart);
app.get('/loadgaugechart',gauge.getGaugeChart);


app.get('/google5dd28b475d00bead.html', function(req, res){
	res.render('google5dd28b475d00bead');
});

app.get('/sitemap.xml', function(req, res){
	res.render('sitemap');
});

app.get('/robots.txt', function(req, res){
	res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.get('/api/session',function(req,res){
	
	if(req.session.data){
		res.send(JSON.stringify({"response" : req.session.data}));
	}
	else{
		res.send(JSON.stringify({"response" : "No Session Data to GET"}));
	}
});
app.post('/api/session',function(req,res){
	
	console.log(req.secret);
	//
	
	if(req.session.data){
		req.session.data = req.param("sessionData");
		res.send(JSON.stringify({"response" : req.session.data}));
	}
	else{
		
		req.session.data = req.param("sessionData");
		res.send(JSON.stringify({"response" : req.session.data}));
	}
});

app.del('/api/session',function(req,res){

	if(req.session.data){
		req.session.destroy();
		res.send(JSON.stringify({"response" : "Session Destroyed"}));
	}else{
		res.send(JSON.stringify({"response" : "No Session Data to DELETE"}));
	}
});

app.get('/api/loggedin_userinfo',function(req,res){
	userid = req.session.userid;
	user.getuserinfo(userid, res);
	/*if(req.session.userid) {
		var userid = req.session.userid;

		//mysql data fetch.
		user.getuserinfo(userid, res);
	}
	else{
		res.send(JSON.stringify({"response" : "No Session Data to GET"}));
	}*/
});

app.get('/api/bookingoverview',function(req,res){
	userid = req.session.userid;
	booking.gettopbookings(userid, res);
});

app.get('/privateParking',function(req,res){
    console.log("Inside app.js /privateParking" +req.query.latitude + " " + req.query.longitude);
    reservation.getPrivateParking(req,res);
});
 
app.get('/checkPaymentInfo',function(req,res){
    console.log("Inside app.js /validatePaymentInfo "+req.query.spotid);
    reservation.checkPaymentInfo(req,res);
});
 
app.get('/createReservation',function(req,res){
    console.log("Inside app.js /createReservation "+req.query.searchtime);
    //reservation.checkPaymentInfo(req,res);
});

app.get('/api/getspaces',function(req,res){
	userid = req.session.userid;
	booking.getspaces(userid, res);
});

app.get('/api/mylisting',function(req,res){
	userid = req.session.userid;
	booking.getallbookings(userid, res);
});

app.get('/api/getcounts',function(req,res){
	userid = req.session.userid;
	booking.getcounts(userid, res);
});

app.post('/api/loggedin_userinfo',function(req,res){
	debugger;
	user.updateuserinfo(req.body, req.session.userid,res);
});

app.get('/getAllImages',function(req,res){
    console.log("Inside app.js /getAllImages "+req.query.spotid);
    image.getAllImages(req,res);
});


//website traffic
app.get('/api/getwebsitetraffic',function(req,res){
    dashboard.websitetraffic(req, res);
});

//no of users
app.get('/api/getnumberofusers',function(req,res){
    dashboard.noofusers(req, res);
});

//total sales
app.get('/api/gettotalsales',function(req,res){
    dashboard.toalsales(req, res);
});

//get low review values
app.get('/api/getlowreviewvalues',function(req,res){
    dashboard.getlowreviewvalues(req, res);
});

//get high review values
app.get('/api/gethighreviewvalues',function(req,res){
    dashboard.gethighreviewvalues(req, res);
});

//get priority spots
app.get('/api/getpriorityspots',function(req,res){
    dashboard.getpriorityspots(req, res);
});

//get user listings
app.get('/api/getuserlisting/:limit/:offset',function(req,res){
    listing.getuserlisting(req, res, req.session.userid, req.params.limit, req.params.offset);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
