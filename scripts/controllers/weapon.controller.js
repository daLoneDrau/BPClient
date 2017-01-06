/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicWeaponController', function($scope, $window,
		basicDiceService, basicGroupService, basicItemService, basicObjectTypeService, $q, $http) {
    $scope.newEntity = {
        count: 0,
        damages: {},
        description: "",
        food_value: 0,
        groups: [],
        internal_script: "",
        name: "",
        left_ring: false,
        light_value: 0,
        max_owned: 0,
        modifiers: {},
        number: 0,
        price: 0.0,
        ring_type: 0,
        stack_size: 0,
        steal_value: 0,
        types: [],
        weight: 0.0
    };
    const MASTER_GROUP_LIST = [
    	"BLUNT_WEAPON", "EDGED_WEAPON", "HEAVY_WEAPON", "LIGHT_WEAPON", "LONGBOW",
    	"PIERCING_WEAPON", "PROJECTILE_WEAPON", "SILVER_WEAPON", "STAFF", "THROWN_WEAPON"
    ];
    const MASTER_OBJECT_LIST = [
    	"OBJECT_TYPE_DAGGER", "OBJECT_TYPE_1H", "OBJECT_TYPE_2H", "OBJECT_TYPE_BOW"
    ];
    var findEntity = function(entity, entities) {
    	var t = 0;
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].name === entity.name
            		&& entities[i].internal_script === entity.internal_script
            		&& entities[i].description === entity.description
            		&& entities[i].price === entity.price
            		&& entities[i].weight === entity.weight
            		&& entities[i].damages === entity.damages
            		&& entities[i].types.length === entity.types.length
            		&& entities[i].groups.length === entity.groups.length) {
            	var same = false;
            	for (var j = entities[i].types.length - 1; i >= 0; i--) {
            		if (entities[i].types[j] === entity.types[j]) {
            			same = true;
            			break;
            		}
            	}
            	if (!same) {
	            	for (var j = entities[i].groups.length - 1; i >= 0; i--) {
	            		if (entities[i].groups[j] === entity.groups[j]) {
	            			same = true;
	            			break;
	            		}
	            	}
            	}
            	if (same) {
                    found = "A weapon with the same data already exists";
            	}
            }
        }
        return found;
    };
    var getAllDiceEntities = function() {
        var promise = basicDiceService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.dice_entities = response.data;
                for (var i = $scope.dice_entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.dice_entities[i].id)) {
                        $scope.dice_entities[i].id = 0;
                    }
                }
            }
        });
    };
    var getAllEntities = function() {
        var promise = basicItemService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.entities = response.data;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                	var entity = $scope.entities[i];
                	entity.types = entity.types[0];
                    if (angular.isUndefined(entity.id)) {
                    	entity.id = 0;
                    }
                    var isWeapon = false;
                    if (!MASTER_OBJECT_LIST.includes(entity.types.code)) {
                        $scope.entities.splice(i, 1);
                    }
                }
            }
        });
    };
    var getAllGroupEntities = function() {
        var promise = basicGroupService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.group_entities = response.data;
                for (var i = $scope.group_entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.group_entities[i].id)) {
                        $scope.group_entities[i].id = 0;
                    }
                    if (!MASTER_GROUP_LIST.includes($scope.group_entities[i].name)) {
                        $scope.group_entities.splice(i, 1);
                    }
                }
            }
        });
    };
    var getAllObjectTypeEntities = function() {
        var promise = basicObjectTypeService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.object_type_entities = response.data;
                for (var i = $scope.object_type_entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.object_type_entities[i].id)) {
                        $scope.object_type_entities[i].id = 0;
                    }
                    if (!MASTER_OBJECT_LIST.includes($scope.object_type_entities[i].code)) {
                        $scope.object_type_entities.splice(i, 1);
                    }
                }
            }
        });
    };
    var postEntity = function() {
        var promise = basicItemService.insertEntity($scope.newEntity);
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
        var promise = basicItemService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.code = "";
                $scope.newEntity.value = 0;
                getAllEntities();
            }
        });
    };
    var validateGroups = function(groups) {
        var isBlunt = false;
        var isEdged = false;
        var isHeavy = false;
        var isLight = false;
        var isPiercing = false;
        var msg = "";
        for (var i = groups.length - 1; i >= 0; i--) {
            if (groups[i].name === "BLUNT_WEAPON") {
                isBlunt = true;
            }
            if (groups[i].name === "EDGED_WEAPON") {
                isEdged = true;
            }
            if (groups[i].name === "HEAVY_WEAPON") {
                isHeavy = true;
            }
            if (groups[i].name === "LIGHT_WEAPON") {
                isLight = true;
            }
            if (groups[i].name === "PIERCING_WEAPON") {
                isPiercing = true;
            }
        }
        if (isBlunt
                && isEdged) {
            msg = "A weapon can't be Blunt AND Edged.";
        }
        if (isBlunt
                && isPiercing) {
            msg = "A weapon can't be Blunt AND Piercing.";
        }
        if (isHeavy
                && isLight) {
            msg = "A weapon can't be Light AND Heavy.";
        }
        return msg;
    };
    $scope.create = function() {
        $scope.newEntity.types = [ $scope.newEntity.types ];
        console.log($scope.newEntity);
        var msg = validateGroups($scope.newEntity.groups);
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            if ($scope.entities.length > 0) {
                msg = findEntity($scope.newEntity, $scope.entities);
                if (msg.length > 0) {
                    $window.alert(msg);
                } else {
                    postEntity();
                }
            } else {
                postEntity();
            }            
        }
    };
    $scope.update = function() {
        $scope.entitySelect.types = [ $scope.entitySelect.types ];
        var msg = '';
        for (var i = $scope.entities.length - 1; i >= 0; i--) {
            if ($scope.entities[i].id === $scope.entitySelect.id) {
                continue;
            }
            for (var i = $scope.entities.length - 1; i >= 0; i--) {
                if ($scope.entities[i].name === $scope.entitySelect.name
                		&& $scope.entities[i].internal_script === $scope.entitySelect.internal_script
                		&& $scope.entities[i].description === $scope.entitySelect.description
                		&& $scope.entities[i].price === $scope.entitySelect.price
                		&& $scope.entities[i].weight === $scope.entitySelect.weight
                		&& $scope.entities[i].damages === $scope.entitySelect.damages
                		&& $scope.entities[i].types.length === $scope.entitySelect.types.length
                		&& $scope.entities[i].groups.length === $scope.entitySelect.groups.length) {
                	var same = false;
                	for (var j = $scope.entities[i].types.length - 1; i >= 0; i--) {
                		if ($scope.entities[i].types[j] === $scope.entitySelect.types[j]) {
                			same = true;
                			break;
                		}
                	}
                	if (!same) {
    	            	for (var j = $scope.entities[i].groups.length - 1; i >= 0; i--) {
    	            		if ($scope.entities[i].groups[j] === $scope.entitySelect.groups[j]) {
    	            			same = true;
    	            			break;
    	            		}
    	            	}
                	}
                	if (same) {
                        msg = "A weapon with the same data already exists";
                	}
                }
            }
        }
        if (msg.length > 0) {
            $window.alert(msg);
        } else {
            putEntity();
        }
    };
    getAllEntities();
    getAllDiceEntities();
    getAllGroupEntities();
    getAllObjectTypeEntities();
});