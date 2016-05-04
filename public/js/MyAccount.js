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
			$scope.userInfo.counter = data.counter;

			for(var key in data){
				if(data[key] != null && data[key] != ""){
					count += 1;
				}
				total += 1;
			}

		activitygauge($scope);
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
                    $scope.userInfo.data = "Updated successfully";
                     $scope.userInfo.font = "green";
					for(var key in data){
				if(data[key] != null && data[key] != ""){
					count += 1;
				}
				total += 1;
			}
				$scope.userInfo.complete = Math.round((count*100)/total);	
				})

                
                .error(function(err){
                    $scope.userInfo.data = "Update Failed!";
                    $scope.userInfo.font = "red";
                    //if (xhr.status != 200) alert(xhr.responseText);
                });
				
		}
	};
}

function activitygauge($scope) {
	    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#activity-gauge').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 50,
            title: {
                text: 'Visits'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Visits',
            data: [$scope.userInfo.counter],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/></div>'
            },
            tooltip: {
                valueSuffix: ''
            }
        }]

    }));



    // Bring life to the dials
    setTimeout(function () {
        // Speed
        var chart = $('#activity-gauge').highcharts(),
            point,
            newVal,
            inc;

        if (chart) {
            point = chart.series[0].points[0];
            //inc = Math.round((Math.random() - 0.5) * 100);
            //newVal = point.y + inc;
            newVal = $scope.userInfo.counter;

            /*if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }*/

            point.update(newVal);
        }

    }, 200);
}
