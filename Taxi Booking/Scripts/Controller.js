angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    

    $scope.changeView = function (view) { 
        $scope.viewBookings = false;
        $scope.addBookings = false;
        $scope.addRoutes = false;
        $scope.addVehicles = false;
        $scope.viewRoutes = false;
        $scope.viewVehicles = false;
        $scope.editBookings - false;
        $scope.editRoutes - false;
        $scope.editVehicles = false;

        //Potentially cleaner version of above but need to test further
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
                $scope.errorMessage = error;

            });

        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle") //vehicle REST API
            .success(function (response) {
                $scope.vehicle = response;
            })
            .error(function (error) {
                $scope.errorMessage = error; 

            });

    };

    $scope.initialise();

    //Adding a Booking - Works
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
    //End of Adding a Booking


    //Adding a Route - DOES NOT WORK - I cant seem to get this or Route Edit to work at all even though Booking Add/Vehicle Add work fine and Vehicle Edit and Booking Edit work correctly. 
    //Please look into it because I just cant get it to work sadly.
    $scope.addRoute = function () {
        var routeDetails = {
            RouteEndPoint: $scope.routesRouteStartPoint,
            RouteStartPoint: $scope.routesRouteStartPoint
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/", routeDetails)
            .success(function (response) {
                $scope.initialise();
                $scope.changeView('viewRoutes');
            })
            .error(function (error) {
                $scope.errorMessage = error; 

            });

    };
    //End of Adding a Route


    //Adding a Vehicle - Works
    $scope.addVehicle = function () {
        var vehicleDetails = {
            Capacity: $scope.vehiclesCapacity,
            Driver: $scope.vehiclesDriver,
            Make: $scope.vehiclesMake,
            Model: $scope.vehiclesModel,
            Registration: $scope.vehiclesRegistration,
        };

    $http.post("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/", vehicleDetails)
            .success(function (response) {
                $scope.initialise();
                $scope.changeView('viewVehicles');
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });

    };
    //End of Adding a Route

    //Cancel Function for Adding Booking
    //As each cancel function currently does one thing (change view), it would be more efficient to simply call the change view function and do away with separate cancel functions
    $scope.cancelBookingAdd = function () {
        $scope.changeView('viewBookings')
    };

    //Cancel Function for Adding Route
    $scope.cancelRouteAdd = function () {
        $scope.changeView('viewRoutes')
    };

    //Cancel Function for Adding Route
    $scope.cancelVechicleAdd = function () {
        $scope.changeView('viewVehicles')
    };


    //Beginning of editing Bookings - Mostly Works apart from the Passanger Name not updating for some reason. 
    $scope.editBook = function (id) {
        $scope.changeView('editBookings');
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + id)
            .success(function (response) {
                bookID = id; // is this needed/in correct format?
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
                Id: bookID,//Again, is this needed?
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
        $scope.editBookings = false; // Would be more efficient to leave this here as this is the only place it is relevant, rather than running this EVERY time the changeView function is used
    };
    //End of editing Bookings


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
    //End of Delete a Booking

    //Edit Route - Doesnt work Yet. No idea what ive done wrong. 
    $scope.editRoute = function (id) {
        $scope.changeView('editRoutes');
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + id)
            .success(function (response) {
                routeID = id;
                $scope.editRouteEndPoint = response.RouteEndPoint;
                $scope.editRouteStartPoint = response.RouteStartPoint;
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });
    };

    // Submit or Cancel Route edit
    $scope.closeRouteEdit = function (submit) {
        if (submit) {
            //Variable Declaration for Put update
            var editRouteDetails = {
                Id: routeID,
                RouteEndPoint: $scope.editRouteEndPoint,
                RouteStartPoint: $scope.editRouteStartPoint
            };
            $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route" + "/", editRouteDetails)
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
        $scope.changeView('viewRoutes'); 
        $scope.editRoutes = false;
    };

    //Delete Routes
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

    //Beginning of editing Vehicles
    //Show the edit view. Get the specific booking to edit through params, and then display in labels on html form.
    $scope.editVehicle = function (id) {
        $scope.changeView('editVehicles');
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/" + id)
            .success(function (response) {
                vehicleID = id;
                $scope.editCapacity = response.Capacity;
                $scope.editDriver = response.Driver;
                $scope.editMake = response.Make;
                $scope.editModel = response.Model;
                $scope.editRegistration = response.Registration;

            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });
    };

    // Submit or Cancel booking edit
    $scope.closeVehicleEdit = function (submit) {
        if (submit) {
            //Save user input and send to the REST API. scope.names may need changing if they cause conflict with add/other same name variables
            var editvehicleDetails = {
                Id: vehicleID,
                Capacity: $scope.editCapacity,
                Driver: $scope.editDriver,
                Make: $scope.editMake,
                Model: $scope.editModel,
                Registration: $scope.editRegistration
            };
            $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/", editvehicleDetails)
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
        $scope.changeView('viewVehicles'); //May neeed to change position
    };
    //End of editing Vehicles

    //Delete Vehicles
    $scope.deleteVehicle = function (id) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle" + "/" + id)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewVehicles');
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });

    };

    

});