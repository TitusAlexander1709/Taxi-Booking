angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    

    $scope.changeView = function (view) { 
        $scope.viewBookings = false;
        $scope.addBookings = false;
        $scope.viewRoutes = false;
        $scope.viewVehicles = false;
        //$scope.viewBookings =  $scope.addBookings = $scope.viewRoutes = $scope.viewVehicles = false;
       
        


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
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route") //Routes REST API
            .success(function (response) {
                $scope.route = response;
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

    //Shwo the edit view. Get the specific booking to edit through params, and then display in labels on html form.
    $scope.editBook = function (id) {
        $scope.changeView('editBookings');
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + "/" + id)
            .success(function (response) {
                var editBookingDetails = {
                    bookingsCurrentPassenger: response.CurrentPassenger,
                    bookingsDropOffLocation: response.DropOffLocation,
                    bookingsPassengerName: response.PassengerName,
                    bookingsPickupLocation: response.PickupLocation,
                    bookingsVehicleId: reponse.VehicleId,
                    bookingsId: response.Id
                };

            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });
    };

    // Submit or Cancel booking edit
    $scope.closeEdit = function (submit) {
        if (submit) {
            //Save user input and send to the REST API. scope.names may need changing if they cause conflict with add/other same name variables
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
                    
                })
                .error(function (error) {
                    $scope.errorMessage = error; // create error message view.
                });
        }
        else {
            $scope.initialise();
        }
        $scope.changeView('viewBookings'); //May neeed to change position
    };

    // Delete a booking from list
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

    $scope.editRoute = function (id) {
        //Take from Booking !!!!!!
    };
    $scope.deleteRoute = function (id) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route" + "/" + id)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewRoutes');
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });

    };




    

});