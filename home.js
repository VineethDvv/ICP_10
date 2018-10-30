'use strict';
var myapp = angular.module('myApp',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('View1Ctrl',function($scope,$http){
    $scope.venueList = [];
    $scope.getVenues = function(){
        $scope.dataparameters={
            'place':$scope.place,
            'filter':$scope.filter
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8089/home',$scope.dataparameters);
        req.success(function(data, status, headers, config) {
            console.log("ochindi");
            console.log(data);
            for (var i = 0; i < data.response.groups[0].items.length; i++) {
                $scope.venueList[i] = {
                    "name": data.response.groups[0].items[i].venue.name,
                    "location": data.response.groups[0].items[i].venue.name
                };
                console.log(JSON.stringify(data.response.groups[0].items[0].venue.name));
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});


// Declare app level module which depends on views, and components
/*angular.module('myApp', [])
    .controller('View1Ctrl', function ($scope, $http) {
        $scope.getVenues = function () {
            $scope.dataparameters={
              'place':$scope.place,
              'filter':$scope.filter
            };

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8081/home',$scope.dataparameters);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});*/
