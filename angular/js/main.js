/**
 * Created by Mao on 2016/7/8.
 */
var app = angular.module('myApp',[]);
app.run(function ($rootScope) {
    $rootScope.name = "Ari Lerner";
});
app.controller('MyController',function ($scope) {
    $scope.person = {
        name: "Ari Lerner"
    };
});
app.controller('ParentController', function($scope) {
    $scope.person = {greeted: false};
});

app.controller('ChildController', function($scope) {
    $scope.sayHello = function() {
        $scope.person.greeted = true;
    }
});
app.controller('PlayerController',['$scope',function ($scope) {
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '/media/a.mp4';
}]);
app.controller('PlayerController',['$scope',function ($scope) {

}]);
// app.controller('MyController', function($scope) {
//     $scope.person = { name: "Ari Lerner" };
//     var updateClock = function() {
//         $scope.clock = new Date();
//     };
//     var timer = setInterval(function() {
//         $scope.$apply(updateClock);
//     }, 1000);
//     updateClock();
// });
app.controller("MyController",function ($scope) {
    $scope.person = { name: 'Miao Miao'};
    var updateClock = function () {
        $scope.clock = new  Date();
    };
    var timer = setInterval(function () {
        $scope.$apply(updateClock);
    },20000);
    updateClock();
});

app.controller("DemoController",function ($scope) {
    $scope.counter = 0;
    $scope.add = function (amount) {
        $scope.counter += amount;
        $scope.subtract = function (amount) {
            $scope.counter -= amount;
        }
    }
});
// $http({  method: 'JSONP',
//     url: 'http://api.openbeerdatabase.com/v1/beers.json?callback=JSON_CALLBACK'}).
//     success(function(data, status, headers, config) {
// data contains the response
// status is the HTTP status
// headers is the header getter function
// config is the object that was used to create the HTTP request}).error(function(data, status, headers, config) {});