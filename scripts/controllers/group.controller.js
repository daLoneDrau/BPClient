/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicGroupController', function($scope, basicGroupService, $q, $http) {
    $scope.divName = "";
    $scope.create = function() {
        if ($scope.divName.length > 0) {
            $scope.divName = $scope.divName.replace(/ /g, "_");
            if ($scope.entities.length > 0) {
                var found = false;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if ($scope.entities[i].name === $scope.divName) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    postEntity();
                }
            } else {
                postEntity();
            }
        }
    };
    $scope.update = function() {
        if (!angular.isUndefined($scope.groupSelect)
                && !angular.isUndefined($scope.groupSelect.name)
                && $scope.groupSelect.name.length > 0) {
            var found = false;
            for (var i = $scope.entities.length - 1; i >= 0; i--) {
                if ($scope.entities[i].name === $scope.groupSelect.name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                putEntity();
            }
        }
    };
    var getAllEntities = function() {
        var promise = basicGroupService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = response.data;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.entities[i].id)) {
                        $scope.entities[i].id = 0;
                        break;
                    }
                }
            }
        });
    };
    var postEntity = function() {
        var promise = basicGroupService.insertEntity({ name: $scope.divName });
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.divName = "";
                getAllEntities();
            }
        });
    };
    var putEntity = function() {
        var promise = basicGroupService.updateEntity($scope.groupSelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.divName = "";
                getAllEntities();
            }
        });
    };
    getAllEntities();
});