/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicDiceController', function($scope, $window, basicDieService, basicDiceService, $q, $http) {
    $scope.newEntity = {
        code: "",
        die: {},
        number: 0
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].code === entity.code) {
                found = "A dice roll with that code already exists";
                break;
            }
            if (entities[i].number === entity.number
                    && entities[i].die.code === entity.die.code) {
                found = "A dice roll with that number already exists";
                break;
            }
        }
        return found;
    };
    var getAllDieEntities = function() {       
        var promise = basicDieService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.die_entities = response.data;
                for (var i = $scope.die_entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.die_entities[i].id)) {
                        $scope.die_entities[i].id = 0;
                    }
                }
            }
        });
    };
    var getAllEntities = function() {
        var promise = basicDiceService.getEntities();
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
        var promise = basicDiceService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.die = {};
                $scope.newEntity.number = 0;
                getAllEntities();
            } else {
                console.error(response);
            }
        });
    };
    var putEntity = function() {
        var promise = basicDiceService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.value = 0;
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
            if ($scope.entities[i].code === $scope.entitySelect.code) {
                msg = "A dice roll with that code already exists";
                break;
            }
            if ($scope.entities[i].number === $scope.entitySelect.number
                    && $scope.entities[i].die.code === $scope.entitySelect.die.code) {
                msg = "A dice roll with that number already exists";
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
    getAllDieEntities();
});