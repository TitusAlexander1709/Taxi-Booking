angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    

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

    //Adding a booking
    $scope.addBooking = function () {
        var bookingDetails = {
            bookingsPassenger: $scope.CurrentPassenger,
            bookingsDropOff: $scope.DropOffLocation,
            bookingsPasName: $scope.PassengerName,
            bookingsPickup: $scope.PickupLocation,
            bookingsVehicle: $scope.VehicleId
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/", bookingDetails)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewBookings');
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });
        
    };

    $scope.cancelAdd = function () {
        $scope.changeView('viewBookings')
    };

    $scope.editBook = function (bookings) {

    };

    
    $scope.deleteBook = function (id) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking" + "/" + id)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewBookings');
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });
    };






    

});