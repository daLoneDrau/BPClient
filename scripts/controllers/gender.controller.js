/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicGenderController', function($scope, $window, basicGenderService, $q, $http) {
    $scope.newEntity = {
        name: "",
        description: ""
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].name === entity.name) {
                found = "A gender with that name already exists";
                break;
            }
            if (entities[i].description === entity.description) {
                found = "A gender with that description already exists";
                break;
            }
        }
        return found;
    };
    var getAllEntities = function() {
        var promise = basicGenderService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = response.data;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.entities[i].id)) {
                        $scope.entities[i].id = 0;
                    }
                }
            }
        });
    };
    var postEntity = function() {
        console.log("POST::");
        console.log($scope.newEntity);
        var promise = basicGenderService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                getAllEntities();
            } else {
                console.error(response);
            }
        });
    };
    var putEntity = function() {
        var promise = basicGenderService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                getAllEntities();
            }
        });
    };
    $scope.create = function() {
        if ($scope.entities.length > 0) {
            var msg = findEntity($scope.newEntity, $scope.entities);
            if (msg.length > 0) {
                $window.alert(msg);
            } else {
                postEntity();
            }
        } else {
            postEntity();
        }
    };
    $scope.update = function() {
        var msg = '';
        for (var i = $scope.entities.length - 1; i >= 0; i--) {
            if ($scope.entities[i].id === $scope.entitySelect.id) {
                continue;
            }
            if ($scope.entities[i].name === $scope.entitySelect.name) {
                msg = "A gender with that name already exists";
                break;
            }
            if ($scope.entities[i].description === $scope.entitySelect.description) {
                msg = "A gender with that description already exists";
                break;
            }
        }
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            putEntity();
        }
    };
    getAllEntities();
});