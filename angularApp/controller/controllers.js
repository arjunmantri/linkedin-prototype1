﻿
app.controller('UserController', function ($scope,$http, userService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();
    function init() {
    	$http.get("/userFollowing").success(function(response) {
		    	 $scope.users = response;
		    	 });
    	$http.get("/companyFollowing").success(function(response){
    		$scope.companies=response;
    	});
    	$http.get("/getJobPosts").success(function(response){
    		$scope.jobposts=response;
    	})
    }

    $scope.saveInfo = function () {
    	$http({
            method: 'POST',
            url: '/userProfile',
            data: { 
                    "Address":$scope.address,
                    "Country":$scope.country,
                    "ZipCode":$scope.zipcode,
                    "Bio":$scope.bio,
                    "CompanyName": $scope.companyName, 
                    "CompanyTitle": $scope.inputTitle,                               
                    "CompanyStartDate": $scope.startDate,
                    "CompanyEndDate": $scope.endDate,
                    "CompanyDescription": $scope.inputDescription,
                    "EducationSchool": $scope.inputSchool,
                    "EducationDegree":$scope.degree,                            
                    "EducationField": $scope.inputField,
                    "Level": $scope.inputLevel,
                    "Grade": $scope.inputGrade,
                    "EducationStartDate": $scope.schoolStartDate,
                    "EducationEndDate": $scope.schoolEndDate                                             
                    
                }
            
         }).success(function(response){
           
            alert(JSON.stringify(response));
            
            if(response.save == "Success")
              window.location = '/viewProfile';
            else
              window.location = '/viewProfile';
        }).error(function(error){
            alert("error");
        });
    };

    $scope.deleteCustomer = function (id) {
        customersService.deleteCustomer(id);
    };
});

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the order view
app.controller('CustomerOrdersController', function ($scope, $routeParams, customersService) {
    $scope.customer = {};
    $scope.ordersTotal = 0.00;

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        //Grab customerID off of the route        
        var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
        if (customerID > 0) {
            $scope.customer = customersService.getCustomer(customerID);
        }
    }

});

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the orders view
app.controller('OrdersController', function ($scope, customersService) {
    $scope.customers = [];

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.customers = customersService.getCustomers();
    }
});

app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true;
        } else {
            return false;
        }
    }
});

//This controller is a child controller that will inherit functionality from a parent
//It's used to track the orderby parameter and ordersTotal for a customer. Put it here rather than duplicating 
//setOrder and orderby across multiple controllers.
app.controller('OrderChildController', function ($scope) {
    $scope.orderby = 'product';
    $scope.reverse = false;
    $scope.ordersTotal = 0.00;

    init();

    function init() {
        //Calculate grand total
        //Handled at this level so we don't duplicate it across parent controllers
        if ($scope.customer && $scope.customer.orders) {
            var total = 0.00;
            for (var i = 0; i < $scope.customer.orders.length; i++) {
                var order = $scope.customer.orders[i];
                total += order.orderTotal;
            }
            $scope.ordersTotal = total;
        }
    }

    $scope.setOrder = function (orderby) {
        if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };

});
