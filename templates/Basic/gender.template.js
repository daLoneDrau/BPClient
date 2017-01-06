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
            <!-- Gender Name --> \
            <div class="form-group"> \
                <label for="txtCode" class="control-label col-sm-4">Name</label> \
                <div class="col-sm-8"> \
                    <input ng-model="newEntity.name" type="text" class="form-control" id="txtCode" name="txtCode" placeholder="e. g. D6" required /> \
                </div> \
            </div> \
            <!-- Gender Description --> \
            <div class="form-group"> \
                <label for="txtDesc" class="control-label col-sm-4">Description</label> \
                <div class="col-sm-8"> \
                    <textarea ng-model="newEntity.description" cols="40" rows="5" class="form-control" id="txtDesc" name="txtDesc" required ></textarea> \
                </div> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <div class="col-sm-8 col-sm-offset-4"> \
                    <button type="submit" class="btn btn-primary" ng-disabled="!createForm.$valid">Add Gender</button> \
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
        <span class="text-muted">Current Genders: </span><span ng-repeat="entity in entities | orderBy:\'name\'"><span ng-show="!$first">, </span>{{entity.name | uppercase}}</span> \
    </div> \
    <!-- -------------------- --> \
    <!-- Update Entities Form --> \
    <!-- -------------------- --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update Gender</p> \
        <form name="updateForm" class="form-inline" ng-submit="update()" novalidate> \
            <div class="form-group"> <!-- Select Entity --> \
                <label for="selEntity" class="control-label">Choose:</label> \
                <select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.name | uppercase for entity in entities | orderBy:\'name\' track by entity.id"> \
                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
                </select> \
            </div> \
            <!-- Update Name -->  \
            <div class="form-group"> \
                <label for="updCode" class="control-label">Name</label> \
                <input ng-model="entitySelect.name" type="text" class="form-control" id="updName" name="updName" required> \
            </div> \
            <!-- Update Description --> \
            <div class="form-group"> \
                <label for="updDesc" class="control-label">Edit Description</label> \
                <textarea ng-model="entitySelect.description" cols="40" rows="5" class="form-control" id="updDesc" name="updDesc" required></textarea> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <button type="submit" class="btn btn-primary" ng-disabled="!updateForm.$valid">Update</button> \
            </div> \
        </form> \
    </div> \
    </div> \
    ';
    $templateCache.put('basic_genders', multiStr);
});