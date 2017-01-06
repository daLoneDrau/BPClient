/*jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp', ["ngRoute"]);

angular.module('restApp').config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: 'main'
    }).when("/basic", {
        templateUrl: 'basic_main'
    }).when("/attributes", {
        controller: "AttributeController",
        templateUrl: 'attributes'
    });                                 
});

angular.module('restApp').directive('powerOfTwo', function() {
    return {
        // limit usage to argument only
        restrict: 'A',

        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',

        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {
            // please note you can name your function & argument anything you like
            ctrl.$validators.power_of_2 = function(ngModelValue) {
                if (typeof ngModelValue !== 'number') {
                    return 'Not a number';   
                }  
                return ngModelValue && (ngModelValue & (ngModelValue - 1)) === 0;
            };
        }
    };
});
angular.module('restApp').directive('basicNav', function() {
    return {
        // limit usage to element only
        restrict: 'E',
        templateUrl: 'basic_nav',
        controller: function($scope) {
        }
    };
});
