function MyAccountService($http) {
	return {
		get : function() {
			return $http.get('/api/loggedin_userinfo');
		},
		create : function(MyAccountData) {
			return $http.post('/api/loggedin_userinfo', MyAccountData);
		},
		delete : function(id) {
			return $http.delete('/api/todos/' + id);
		}
	}
};


function initializeMyAccount($scope, $http) {
//	$scope.formData = {};

	var service = MyAccountService($http);
	var count = 0;
	var total =0;
	service.get()
		.success(function(data) {
			$scope.userInfo = data;

			for(var key in data){
				if(data[key] != null && data[key] != ""){
					count += 1;
				}
				total += 1;
			}
		$scope.userInfo.complete = Math.round((count*100)/total);
		$(".progress-bar").animate({
			width : $scope.userInfo.complete + "%"
		}, 1000);
		});
	
	$scope.updateInfo = function() {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.userInfo.firstname != undefined) {
			$scope.loading = true;
			
			// call the create function from our service (returns a promise object)
			service.create($scope.userInfo)

				.success(function(data) {
					console.log(data);

					
				});
				
		}
	};
}


