/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicElementController', function($scope, $window, basicElementService, $q, $http) {
    $scope.newEntity = {
        code: "",
        value: 0
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].code === entity.code) {
                found = "An element with that code already exists";
                break;
            }
            if (entities[i].value === entity.value) {
                found = "An element with that value already exists";
                break;
            }
        }
        return found;
    };
    $scope.create = function() {
        $scope.newEntity.value = $scope.nextValue;
        console.log($scope.newEntity);
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
        var msg = "";
        for (var i = $scope.entities.length - 1; i >= 0; i--) {
            if ($scope.entities[i].id === $scope.entitySelect.id) {
                continue;
            }
            if ($scope.entities[i].code === $scope.entitySelect.code) {
                msg = "An element with that code already exists";
                break;
            }
            if ($scope.entities[i].value === $scope.entitySelect.value) {
                msg = "An element with that value already exists";
                break;
            }
        }
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            putEntity();
        }
    };
    var getAllEntities = function() {
        var promise = basicElementService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = response.data;
                $scope.nextValue = -1;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.entities[i].id)) {
                        $scope.entities[i].id = 0;
                    }
                    if (angular.isUndefined($scope.entities[i].value)) {
                        $scope.entities[i].value = 0;
                    }
                    $scope.nextValue = Math.max($scope.nextValue, $scope.entities[i].value);
                }
                $scope.nextValue = $scope.nextValue + 1;
            }
        });
    };
    var postEntity = function() {
        var promise = basicElementService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.value = 0;
                getAllEntities();
            }
        });
    };
    var putEntity = function() {
        var promise = basicElementService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.value = 0;
                getAllEntities();
            }
        });
    };
    getAllEntities();
});