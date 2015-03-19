var module = angular.module('vizApp', ['ui.bootstrap']);

module.controller('appCtrl', function($scope, $http, $q) {
    $scope.myRest = ''
    $scope.allrest = [];
    $scope.findres = function(myrest){
        for(var key in $scope.allrest){
            if($scope.myRest == $scope.allrest[key].name){
                $scope.mystar = $scope.allrest[key].x;
                $scope.mycount = $scope.allrest[key].y;

            }
        }
    };
	console.log("WECLOME");
	$scope.allNames = [];
	var getCategory = function(type) {
		var deferred = $q.defer();
		$http.get('yelp_phoenix.json')
			.success(function(data) {
				var group = _.reduce(data, function(memo, item) {
					if (_.contains(item.categories, type)) {
						console.log("Found item to add");
						//memo.push(item);
						memo.push({
							name: item.name,
							x: item.stars,
							y: item.review_count
						});
						$scope.allNames.push(item.name);
                        $scope.allrest.push({
                            name: item.name,
                            x: item.stars,
                            y: item.review_count
                        });
					}
					return memo;
				}, []);
				deferred.resolve(group);
			});
		return deferred.promise;
	};

	var promise = getCategory('Chinese');
	var promise1 = getCategory('Indian');
	var promise2 = getCategory('American (Traditional)');
	promise.then(function(group) {	
		$scope.chinese = group;
        $scope.noChi = $scope.chinese.length;

		promise1.then(function(data1){
			$scope.indian = data1;
            $scope.noInd = $scope.indian.length;
			promise2.then(function(data2){
				$scope.americanT = data2;
                $scope.noAme = $scope.americanT.length;






	var chart = new Highcharts.Chart({
    chart: {
        renderTo: 'chart',
        defaultSeriesType: 'scatter'
    },
    
    xAxis: {
       //categories: ['Green', 'Pink'],
        type: 'linear',  
        title: {
        	text: 'Stars'
        }
    },
    yAxis: {
       //categories: ['Green', 'Pink'],
        min: 0,
        title: {
        	text: 'Review Count'
        }
    },
    title: {
    	text: 'Reivew Distribution by Food Category'
    },
    plotOptions: {
       scatter: {
          marker: {
             radius: 10,
             states: {
                hover: {
                   enabled: true,
                   lineColor: 'rgb(100,100,100)'
                }
             }
          },
          states: {
             hover: {
                marker: {
                   enabled: false
                }
             }
          }
       }
    },
    series: [{
        tooltip: {
     
     headerFormat: '<b>{series.name}</b><br>',
     pointFormat: '{point.name}<br/>value: {point.y}'
                    },
        name: 'American (Traditional)',
        data: $scope.americanT
    },{
        tooltip: {
     
     headerFormat: '<b>{series.name}</b><br>',
     pointFormat: '{point.name}<br/>value: {point.y}'
                    },
        name: 'Chinese',
        data: $scope.chinese
    },{
        tooltip: {
     
     headerFormat: '<b>{series.name}</b><br>',
     pointFormat: '{point.name}<br/>value: {point.y}'
                    },
        name: 'Indian',
        data: $scope.indian
    }]
});

		});
	});
console.log($scope.allNames);


	});

	

});