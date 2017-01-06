/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
    <!-- --------------- --> \
    <!-- Add Entity Form --> \
    <!-- --------------- --> \
    <div class="col-sm-10 col-sm-offset-1"> \
        <!-- this form should send a POST request to rest service. --> \
        <form name="createForm" class="form-horizontal" ng-submit="create()" novalidate> \
            <!-- Element Code --> \
            <div class="form-group"> \
                <label for="txtCode" class="control-label col-sm-4">Code</label> \
                <div class="col-sm-8"> \
                    <input ng-model="newEntity.code" type="text" class="form-control" id="txtCode" name="txtCode" placeholder="e. g. EQUIP_ELEMENT_PERSONALITY" required /> \
                </div> \
            </div> \
            <div class="form-group"> <!-- Submit Button --> \
                <div class="col-sm-8 col-sm-offset-4"> \
                    <button type="submit" class="btn btn-primary" ng-disabled="!createForm.$valid">Add Element</button> \
                </div> \
            </div> \
        </form> \
    </div> \
    <!-- ------------------------ --> \
    <!-- List of Current Entities --> \
    <!-- ------------------------ --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <span class="text-muted">Current Elements: </span><span ng-repeat="entity in entities | orderBy:\'code\'"><span ng-show="!$first">, </span>{{entity.code | uppercase}}</span> \
    </div> \
    <!-- -------------------- --> \
    <!-- Update Entities Form --> \
    <!-- -------------------- --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update Element</p> \
        <form name="updateForm" class="form-inline" ng-submit="update()" novalidate> \
            <div class="form-group"> <!-- Select Entity --> \
                <label for="selEntity" class="control-label">Choose:</label> \
                <select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.code | uppercase for entity in entities | orderBy:\'code\' track by entity.id"> \
                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
                </select> \
            </div> \
            <!-- Update Code -->  \
            <div class="form-group"> <!-- Update Code --> \
                <label for="updCode" class="control-label">Code</label> \
                <input ng-model="entitySelect.code" type="text" class="form-control" id="updCode" name="updCode"> \
            </div> \
            <!-- Update Value -->  \
            <div class="form-group"> <!-- Update Code --> \
                <label for="updValue" class="control-label">Value</label> \
                <span type="text" class="form-control" id="updValue" name="updValue">{{entitySelect.value}}</span> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <button type="submit" class="btn btn-primary" ng-disabled="!updateForm.$valid">Update</button> \
            </div> \
        </form> \
    </div> \
    </div> \
    ';
    $templateCache.put('basic_elements', multiStr);
});