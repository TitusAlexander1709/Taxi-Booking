angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    

    $scope.changeView = function (view) { 
        $scope.viewBookings = false;
        $scope.addBookings = false;
        $scope.viewBookings = true;

    };
    $scope.init = function () {
  
        $scope.viewBookings = false;
        $scope.addBookings = false;
    }

    $scope.initialise = function () {
        $http.get("") //bookings REST API
            .success(function (a) {

            })
            .error(function (error) {
            $scope.errorMessage = error; // create error message view

        });

    }






});