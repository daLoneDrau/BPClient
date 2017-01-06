/* jshint multistr: true */
/* jshint node: true */
"use strict";

// local
var httpBase = "http://localhost:8080/BPService/bp/";

// production
// var httpBase = "http://service-osrapi.rhcloud.com/BPService/bp/";

angular.module('restApp').factory('attributeService', function($http, $q) {
    var urlBase = [ httpBase, 'attributes' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('diceService', function($http, $q) {
    var urlBase = [ httpBase, 'dices' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('dieService', function($http, $q) {
    var urlBase = [ httpBase, 'dies' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('elementService', function($http, $q) {
    var urlBase = [ httpBase, 'equipment_element_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getByCode = function (code) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/code/" + code));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('genderService', function($http, $q) {
    var urlBase = [ httpBase, 'genders' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('groupService', function($http, $q) {
    var urlBase = [ httpBase, 'groups' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, division));
        return defer.promise;
    };
    dataFactory.updateEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, division));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('itemService', function($http, $q) {
    var urlBase = [ httpBase, 'io_item_data' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('heroService', function($http, $q) {
    var urlBase = [ httpBase, 'hero' ].join("");
    var dataFactory = {};

    dataFactory.newHero = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + '/new'));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('modifierService', function($http, $q) {
    var urlBase = [ httpBase, 'equipment_item_modifiers' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
angular.module('restApp').factory('objectTypeService', function($http, $q) {
    var urlBase = [ httpBase, 'object_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
