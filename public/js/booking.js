// All the client side code for Angular Js should be here.

// 1. Controller "bookingModule" (move the code from index.html to here.)

// 2. Pass fake data in the controller and render that to html.

// 3. Server side create API GET call that will fetch the fake data.

// 4. Create a Booking service. (see the code from myaccount.js) and use this instead of the fake data.


function BookingService($http) {
	return {
		getOverview : function() {
			return $http.get('/api/bookingoverview');
		},
		getBookings: function() {
			return $http.get('/api/mylisting');
		},
		getSpaces : function() {
			return $http.get('/api/getspaces');
		}
		/*
		create : function(MyAccountData) {
			return $http.post('/api/loggedin_userinfo', MyAccountData);
		},
		delete : function(id) {
			return $http.delete('/api/todos/' + id);
		}*/
	}
};
	function bookingModule($scope, $http) {
		$scope.booktemplate = [ {
			name : 'BookingOverview',
			url : '/bookingoverview'
		}, {
			name : 'BookingHistory',
			url : '/bookinghistory'
		}, {
			name : 'MyBookings',
			url : '/mylisting'
		}, {
			name : 'Payment',
			url : '/payment'
		} ];

		var service = BookingService($http);

		$scope.bookingtemplate = $scope.booktemplate[0];

		$scope.overview = function() {
			$scope.bookingtemplate = $scope.booktemplate[0];
			overview($scope, service);
		};

		$scope.history = function() {
			$scope.bookingtemplate = $scope.booktemplate[1];
		};

		$scope.mybooking = function() {
			$scope.bookingtemplate = $scope.booktemplate[2];
			getAllBookings($scope, service);
		};

		$scope.payment = function() {
			$scope.bookingtemplate = $scope.booktemplate[3];
		};

		$scope.overview();
	}

	function overview($scope, service){
		/*$scope.bookingoverview = [{
			address: "123424 sjdajdhjad",
			status: "Active"
		},
		{
			address: "asagagsd dasjkdakdaj",
			status: "Completed"	
		}];*/

		service.getOverview()
		.success(function(data) {
			$scope.bookingoverview = data;
			var used =0;
			var active =0;
			for(var i = 0; i< data.length;i++){
				if(data[i].status == "Used"){
					used +=1;
				}
				if(data[i].status =="Active"){
					active += 1;
				}
			}
			$scope.used = used;
			$scope.active = active;
		});


		service.getSpaces()
		.success(function(data) {
			$scope.spaceoverview = data;
		});

		
	}
function getAllBookings($scope, service){
	service.getBookings()
		.success(function(data) {
			$scope.allbookings = data;
		});
}


