/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicModifierController', function($scope, $window, basicModifierService, $q, $http) {
    $scope.newEntity = {
        code: "",
        percent: false,
        value: 0
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].code === entity.code) {
                found = "An object type with that code already exists";
                break;
            }
            if (entities[i].flag === entity.flag) {
                found = "An object type with that flag already exists";
                break;
            }
        }
        return found;
    };
    $scope.create = function() {
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
        var msg = findEntity($scope.entitySelect, $scope.entities);
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            putEntity();
        }
    };
    var getAllEntities = function() {        
        var promise = basicModifierService.getEntities();
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
        var promise = basicModifierService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.flag = 0;
                getAllEntities();
            }
        });
    };
    var putEntity = function() {
        var promise = basicModifierService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.flag = 0;
                getAllEntities();
            }
        });
    };
    getAllEntities();
});