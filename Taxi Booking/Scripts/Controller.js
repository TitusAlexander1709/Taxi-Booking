﻿angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    

    $scope.changeView = function (view) { 
        $scope.viewBookings = false;
        $scope.addBookings = false;
        $scope.viewRoutes = false;
        $scope.viewVehicles = false;



        $scope[view]  = true;
    };


    $scope.initialise = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking") //bookings REST API
            .success(function (response) {
                $scope.booking = response;
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });

    };

    $scope.initialise();

    $scope.addBooking = function () {
        var bookingDetails = {
            bookingsPassenger: $scope.CurrentPassenger,
            bookingsDropOff: $scope.DropOffLocation,
            bookingsId: $scope.Id,
            bookingsPasName: $scope.PassengerName,
            bookingsPickup: $scope.PickupLocation,
            bookingsVehicle: $scope.VehicleId
        };
        $scope.booking.push($scope.bookingDetails)
        $scope.changeView('viewBookings')
    };

    $scope.cancelAdd = function () {
        $scope.changeView('viewBookings')
    };

    $scope.editBook = function (bookings) {

    };

    
    $scope.deleteBook = function (bookings) {
        var bookingToDel = $scope.booking.indexOf(bookings);
        $scope.booking.splice(bookingToDel, 1); //Remove 1 item @ index
    };






    

});