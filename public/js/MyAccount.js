angular.module('MyAccountService', [])

	// super simple service
	// each function returns a promise object 
	.factory('MyAccount', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(MyAccountData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);



function initializeMyAccount($scope) {
	$scope.userInfo = {
		'firstname' : 'Shivi',
		'lastname' : 'Jain',
		'email' : 'blah@foo.com',
		'address' : 'blah st, San Jose, Ca',
		'phoneno' : '111-222-3333'
		};
}

function getCurrentUserID()
{
	
}