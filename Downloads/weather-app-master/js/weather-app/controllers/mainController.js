app.controller("mainController", function($scope, $http){

	// set default scope variables
	$scope.data = $scope.img = $scope.loc = $scope.status = null;
    $scope.cityCollection = [];
    $scope.cityDetails = [];
    $scope.cityCollection.push({name :'udit'})

    $scope.addMore = function() {
        $scope.cityDetails = [];
        $scope.cityCollection.push({name :'dharni'})
    }
	// process the following code when the form is submitted
	$scope.submit = function(city) {

		// reset status code
		$scope.status = null;
//        3098bb72b93b64d6f000e88317252ca1
//        api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=1111111111
		// fire ajax request to get weather report for selected location
//		$http.jsonp('http://api.openweathermap.org/data/2.5/weather?q='+ city+ '&callback=JSON_CALLBACK')
		$http.jsonp('http://api.openweathermap.org/data/2.5/forecast?q= '+city+ '&APPID=3098bb72b93b64d6f000e88317252ca1&callback=JSON_CALLBACK')

			// the ajax request was successful
			.success(function(data, status) {
                if($scope.cityDetails.length === 0) {
                    for (var i = 0; i < 14; i++)
                        $scope.cityDetails.push(data.list[i]);

                }

                console.log($scope.cityDetails.length)
				// store request data in scope
				$scope.data = data;

				// store status code in scope
				$scope.status = status;

				// the selected location was found
				if(data.cod == 200) {

					// build image url
//					$scope.img = 'http://openweathermap.org/img/w/' + data.weather[0]['icon'] + '.png';

				// the selected location was not found
				} else {
					// set error message
					$scope.data.message = 'Sorry, \'' + city + '\' could not be found.';
				}
			})

			// the ajax request failed
			.error(function(data, status) {
				// set error message
				$scope.data = 'Oops! The request failed.';

				// store status code in scope
				$scope.status = status;

			});
	}

});