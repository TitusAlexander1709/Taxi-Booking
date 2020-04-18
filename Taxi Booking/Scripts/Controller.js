angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {
    //TO DO
    // CSS (at least 10 selectors used)
    // bootstrap
    // User input validation using Angular Directives 
    // Clean up and refactor code & file structure
    // Make all other links dissappear unless user is logged in
    //HTML source can still be viewed for hidden elements - does this matter?
    // Can the add form fields reset when clicked on again
    //make errors appear in html


    //Login page displayed until user successfully logs in
    $scope.viewLogin = true; 

    $scope.changeView = function (view) {
        if ($scope.authenticated) {
            $scope.viewBookings = false;
            $scope.addBookings = false;
            $scope.addRoutes = false;
            $scope.addVehicles = false;
            $scope.viewRoutes = false;
            $scope.viewVehicles = false;
            $scope.editBookings = false;
            $scope.editRoutes = false;
            $scope.editVehicles = false;

            //Checks if user accessing manager-restricted areas
            if (view == 'editRoutes' || view == 'addVehicles') {
                if ($scope.role == 2) {
                    $scope[view] = true;
                }
                else {
                    $scope.errorMessage = "You must be signed in as a manager to view this";
                    console.log("You must be a manager to do this");
                };
            }
            else {
                $scope[view] = true;
            };
        }
        else {
            $scope.errorMessage = "You must be signed in as a manager to view this";
            console.log("You must be logged in to do this");
        }
    };


    $scope.initialise = function () {
        //Gets and stores all API information in object

        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking") //bookings REST API
            .success(function (response) {
                $scope.booking = response;
            })
            .error(function (error) {
                $scope.errorMessage = error; 

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

    //$scope.initialise();

    //Adding a Booking
    $scope.addBooking = function () {
        //Apply input validation checking on HTML Form
        $scope.editBookingsForm.$setPristine();
        //Create object that stores HTML form inputs
        var bookingDetails = {
            CurrentPassenger: $scope.bookingsPassenger,
            DropOffLocation: $scope.bookingsDropOff,
            PassengerName: $scope.bookingsPasName,
            PickupLocation: $scope.bookingsPickup,
            VehicleId: $scope.bookingsVehicle
        };
        //Send Post request to API along with user input Object
        $http.post("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/", bookingDetails)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewBookings');
            })
            .error(function (error) {
                $scope.errorMessage = error; 
            });      
    };
    //End of Adding a Booking


    //Adding a Route
    $scope.addRoute = function () {
        var routeDetails = {
            RouteEndPoint: $scope.routesRouteEndPoint,
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


    //Adding a Vehicle
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


    //Beginning of editing Bookings - !!!Mostly Works apart from the Passanger Name not updating for some reason. 
    //Show the edit view. Get the specific booking to edit through params, and then display in labels on html form.
    $scope.editBook = function (id) {
        $scope.changeView('editBookings');
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + id)
            .success(function (response) {
                //API response variables assigned to HTML input fields
                bookID = id; // NEEDED?!
                $scope.editPassengerName = response.PassengerName;
                $scope.editCurrentPassenger = response.CurrentPassenger;
                $scope.editDropOffLocation = response.DropOffLocation;
                $scope.editPickupLocation = response.PickupLocation;
                $scope.editVehicleId = response.VehicleId;

            })
            .error(function (error) {
                $scope.errorMessage = error;

            });
        
    };



    // Submit or Cancel booking edit
    $scope.closeEdit = function (submit) {
        //If submitting edit info
        if (submit) {
            //Save user input in object, then use PUT to save to REST API.
            var editbookingDetails = {
                Id: bookID,
                PassengerName: $scope.editPassengerName,
                CurrentPassenger: $scope.editCurrentPassenger,
                DropOffLocation: $scope.editDropOffLocation,
                PickupLocation: $scope.editPickupLocation,
                VehicleId: $scope.editVehicleId
            };
            $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/", editbookingDetails)
                .success(function () {
                    $scope.initialise();
                    $scope.editBookingsForm.$setPristine();
                })
                .error(function (error) {
                    $scope.errorMessage = error;
                });
        }
        else {
            //Cancel edit
            $scope.initialise();
        }
        $scope.changeView('viewBookings'); 
        $scope.editBookings = false; 
    };
    //End of editing Bookings


    // Delete a booking from list
    $scope.deleteBook = function (id) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + id)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewBookings');
            })
            .error(function (error) {
                $scope.errorMessage = error;

            });
    };
    //End of Delete a Booking

    //Get edit Route info
    $scope.editRoute = function (id) {
        $scope.changeView('editRoutes');
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + id)
            .success(function (response) {
                routeID = id;
                $scope.editRouteEndPoint = response.RouteEndPoint;
                $scope.editRouteStartPoint = response.RouteStartPoint;
            })
            .error(function (error) {
                $scope.errorMessage = error; 
            });
    };


    // Submit or Cancel Route edit
    $scope.closeRouteEdit = function (submit) {
        //If saving edited data
        if (submit) {
            //Variable Declaration for Put update
            var editRouteDetails = {
                Id: routeID,
                RouteEndPoint: $scope.editRouteEndPoint,
                RouteStartPoint: $scope.editRouteStartPoint
            };
            $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" , editRouteDetails)
                .success(function (response) {
                    $scope.initialise();
                })
                .error(function (error) {
                    $scope.errorMessage = error;
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
        $http.delete("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + id)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewRoutes');
            })
            .error(function (error) {
                $scope.errorMessage = error; 

            });

    };

    //Beginning of editing Vehicles
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
                $scope.errorMessage = error;
            });
    };

    // Submit or Cancel booking edit
    $scope.closeVehicleEdit = function (submit) {
        if (submit) {
            //Save user input and send to the REST API.
            var editvehicleDetails = {
                // ID remains the same, as editing this cana affect data integrity
                Id: vehicleID,
                Capacity: $scope.editCapacity,
                Driver: $scope.editDriver,
                Make: $scope.editMake,
                Model: $scope.editModel,
                Registration: $scope.editRegistration
            };
            $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/", editvehicleDetails)
                .success(function () {
                    $scope.initialise();

                })
                .error(function (error) {
                    $scope.errorMessage = error; 
                });
        }
        else {
            $scope.initialise();
        }
        $scope.changeView('viewVehicles');
    };
    //End of editing Vehicles

    //Delete Vehicles
    $scope.deleteVehicle = function (id) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/" + id)
            .success(function () {
                $scope.initialise();
                $scope.changeView('viewVehicles');
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    //Login Functionality 
    //Variable stores user where user is not authorised to access site until logged in
    $scope.authenticated = false;

    $scope.login = function (InOrOut) {
        console.log("User login commence");
        $scope.name = "";
        $scope.role = 0;
        // if InOrOut param True == User Logging in. False == User logging out
        if (InOrOut) {  

            var authenticationDetails = {
                username: $scope.usernameEntry,
                password: $scope.passwordEntry
            }

            $http.post("http://webteach_net.hallam.shu.ac.uk/cmsds/api/login/", authenticationDetails)
                .success(function (response) {
                    console.log("API Response. Credentials: " + response.authenticated + response.role + response.username + response.password + response.name);
                    // If user entered correct user/pass, store their role and name, and set authorised = true
                    if (response.authenticated == true && response.role != 0) {
                        $scope.role = response.role;
                        $scope.name = response.name;
                        $scope.authenticated = true;
                        $scope.initialise();
                        $scope.changeView('viewBookings');
                        $scope.viewLogin = false;
                        // !!!!!!!!LogoutButton.visible
                        console.log("User login accepted. Role: " + $scope.role);
                    }
                    else {
                        $scope.errorMessage = "incorrect credentials, please try again";
                        console.log("incorrect credentials, please try again");
                    }           
                })
                .error(function (error) {
                    $scope.errorMessage = error;
                    console.log("User login error");
                });
        }
        // User logging out
        else {
            //Role & Name Variables above are already reset, so just return user to login page 
            $scope.changeView('viewLogin');
            $scope.authenticated = false;
        }
        
    };
});