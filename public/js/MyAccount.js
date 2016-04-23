function MyAccountService($http) {
	return {
		get : function() {
			return $http.get('/api/loggedin_userinfo');
		},
		create : function(MyAccountData) {
			return $http.post('/api/todos', todoData);
		},
		delete : function(id) {
			return $http.delete('/api/todos/' + id);
		}
	}
};


function initializeMyAccount($scope, $http) {
	var service = MyAccountService($http);
	service.get()
		.success(function(data) {
			$scope.userInfo = data;
		});
}