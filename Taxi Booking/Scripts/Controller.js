angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    

    $scope.changeView = function (view) { 
        $scope.viewBookings = false;
        $scope.addBookings = false;
        $scope.viewRoutes = false;
        $scope.viewVehicles = false;
        $scope.editBookings - false;
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
            CurrentPassenger: $scope.bookingsPassenger,
            DropOffLocation: $scope.bookingsDropOff,
            PassengerName: $scope.bookingsPasName,
            PickupLocation: $scope.bookingsPickup,
            VehicleId: $scope.bookingsVehicle
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/", bookingDetails)
            .success(function (response) {
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
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + id)
            .success(function (response) {
                bookID = id
                $scope.editCurrentPassenger = response.CurrentPassenger;
                $scope.editDropOffLocation = response.DropOffLocation;
                $scope.editPassengerName = response.PassengerName;
                $scope.editPickupLocation = response.PickupLocation;
                $scope.editVehicleId = response.VehicleId;

            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });
    };

    // Submit or Cancel booking edit
    $scope.closeEdit = function (submit) {
        if (submit) {
            //Save user input and send to the REST API. scope.names may need changing if they cause conflict with add/other same name variables
            var editbookingDetails = {
                Id: bookID,
                CurrentPassenger: $scope.editCurrentPassenger,
                DropOffLocation: $scope.editDropOffLocation,
                PassengerName: $scope.editPassengerName,
                PickupLocation: $scope.editPickupLocation,
                VehicleId: $scope.editVehicleId
            };
            $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/", editbookingDetails)
                .success(function (response) {
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