angular.module("taxiBookingApp").controller("taxiBookingController", function ($scope, $http) {

    var bookingID;

    $scope.changeView = function (view) {
        $scope.viewBookings = false;
        $scope.addBookings = false;
        $scope.viewRoutes = false;
        $scope.viewVehicles = false;
        $scope.viewEditBookings = false;

        $scope[view] = true;
    };

 

    $scope.initialise = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/") //bookings REST API
            .success(function (response) {
                $scope.booking = response;
            })
            .error(function (error) {
                $scope.errorMessage = error; // create error message view

            });

    };

    $scope.showBookEdit = function (id) {
        $http.get("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + id)
            .success(function (response) {
                bookingID = id;
                $scope.editCurrentPassenger = response.CurrentPassenger;
                $scope.editBookingDropOff = response.DropOffLocation;
                $scope.editPassengerName = response.PassengerName;
                $scope.editPickupLocation = response.PickupLocation;
                $scope.editVehicleId = response.VehicleId;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.editBooking = function () {
        var changedBooking = {
            Id: bookingID,
            CurrentPassenger: $scope.editCurrentPassenger,
            DropOffLocation: $scope.editBookingDropOff,
            PassengerName: $scope.PassengerName,
            PickupLocation: $scope.PickupLocation,
            VehicleId: $scope.VehicleId
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/", changedBooking)
            .success(function (response) {
                $scope.initialise();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });


        $scope.deleteBook = function (bookings) {
            var bookingToDel = $scope.booking.indexOf(bookings);
            $scope.booking.splice(bookingToDel, 1); //Remove 1 item @ index
        };

        $scope.initialise();

    }
})


    
