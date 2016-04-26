// All the client side code for Angular Js should be here.

// 1. Controller "bookingModule" (move the code from index.html to here.)

// 2. Pass fake data in the controller and render that to html.

// 3. Server side create API GET call that will fetch the fake data.

// 4. Create a Booking service. (see the code from myaccount.js) and use this instead of the fake data.

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

		$scope.bookingtemplate = $scope.booktemplate[0];

		$scope.overview = function() {
			$scope.bookingtemplate = $scope.booktemplate[0];
			overview($scope, $http);
		};

		$scope.history = function() {
			$scope.bookingtemplate = $scope.booktemplate[1];
		};

		$scope.mybooking = function() {
			$scope.bookingtemplate = $scope.booktemplate[2];
		};

		$scope.payment = function() {
			$scope.bookingtemplate = $scope.booktemplate[3];
		};

		$scope.overview();
	}

	function overview($scope, $http){
		$scope.bookingoverview = [{
			address: "123424 sjdajdhjad",
			status: "Active"
		},
		{
			address: "asagagsd dasjkdakdaj",
			status: "Completed"	
		}];
	}

