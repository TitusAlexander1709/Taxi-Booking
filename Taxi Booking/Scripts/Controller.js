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

    $scope.addBooking = function () {
        var bookingDetails = {
            currentPassenger: $scope.itineraries.length,
            dropOffLocation: $scope.itineraryName,
            Id: $scope.itineraryDestination,
            passengerName: $scope.itineraryPurpose,
            pickupLocation: new Date($scope.itineraryStartDate),
            vehicleId: new Date($scope.itineraryEndDate)
        };
        $scope.itineraries.push($scope.itineraryDetails)      
    };

    $scope.editBook = function (bookings) {

    };

    $scope.deleteBook = function (bookings) {
        var bookingToDel = $scope.booking.indexOf(bookings);
        $scope.booking.splice(bookingToDel, 1); //Remove 1 item @ index
    };






    

});