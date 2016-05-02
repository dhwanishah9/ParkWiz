
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
  , availability=require('./routes/availabilitychart')
  , gauge=require('./routes/usergauge')
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

app.post('/resetpassword',signin.changepassword)
app.get('/review', review.review);
app.get('/getallreviews', review.getReviews);
app.get('/getreviewschart', review.getReviewsChart);
app.post('/savereview', review.saveReview);
app.get('/availabilitychart',availability.availability);
app.get('/loadavailabilitychart',availability.getAvailabilityChart);
app.get('/gaugechart',gauge.gaugechart);
app.get('/loadgaugechart',gauge.getGaugeChart);

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
	userid = 1;
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
	userid = 1;
	booking.gettopbookings(userid, res);
});

app.get('/api/getspaces',function(req,res){
	userid = 1;
	booking.getspaces(userid, res);
});

app.get('/api/mylisting',function(req,res){
	userid = 1;
	booking.getallbookings(userid, res);
});

app.post('/api/loggedin_userinfo',function(req,res){
	user.updateuserinfo(req.body,res);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
