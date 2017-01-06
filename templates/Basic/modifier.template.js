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
            <!-- Modifier Code --> \
            <div class="form-group"> \
                <label for="txtCode" class="control-label col-sm-4">Code</label> \
                <div class="col-sm-8"> \
                    <input ng-model="newEntity.code" type="text" class="form-control" id="txtCode" name="txtCode" placeholder="e. g. PLUS_2" required /> \
                </div> \
            </div> \
            <!-- Modifier Value -->  \
            <div class="form-group" name="divValue" \
    			ng-class="{ \'has-success\': createForm.txtValue.$valid && !createForm.txtValue.$pristine, \'has-error\': createForm.txtValue.$invalid && !createForm.txtValue.$pristine }" > \
                <label for="txtValue" class="control-label col-sm-4">Value</label> \
                <div class="col-sm-8"> \
                    <input class="form-control" type="number" id="txtValue" name="txtValue" \
                        ng-model="newEntity.value" \
                        ng-minlength="1"\
                        ng-maxlength="3" \
                        min="1" \
                        ng-pattern="/^[0-9]{1,3}$/" /> \
                </div> \
            </div> \
        <!-- Modifier Percent --> \
        <div class="form-check"> \
            <label for="chkPercent" class="form-check-label col-sm-4">Is Percentage?</label> \
            <div class="col-sm-8"> \
                <input ng-model="newEntity.percent" type="checkbox" class="form-check-input" id="chkPercent" name="chkPercent" /> \
            </div> \
        </div> \
            <div class="form-group"> <!-- Submit Button --> \
                <div class="col-sm-8 col-sm-offset-4"> \
                    <button type="submit" class="btn btn-primary" ng-disabled="!createForm.$valid">Add Modifier</button> \
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
        <span class="text-muted">Current Modifiers: </span><span ng-repeat="entity in entities | orderBy:\'code\'"><span ng-show="!$first">, </span>{{entity.code | uppercase}}</span> \
    </div> \
    <!-- -------------------- --> \
    <!-- Update Entities Form --> \
    <!-- -------------------- --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update Modifier</p> \
        <form name="updateForm" class="form-inline" ng-submit="update()" novalidate> \
            <div class="form-group"> <!-- Select Entity --> \
                <label for="selEntity" class="control-label">Choose:</label> \
                <select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.code | uppercase for entity in entities | orderBy:\'value\' track by entity.id"> \
                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
                </select> \
            </div> \
            <!-- Update Code -->  \
            <div class="form-group"> <!-- Update Code --> \
                <label for="updCode" class="control-label">Code</label> \
                <input ng-model="entitySelect.code" type="text" class="form-control" id="updCode" name="updCode"> \
            </div> \
            <!-- Update Value -->  \
            <div \
                class="form-group" \
                name="divValue" \
                ng-class="{ \'has-success\': updateForm.updValue.$valid && !updateForm.updValue.$pristine, \'has-error\': updateForm.updValue.$invalid && !updateForm.updValue.$pristine }" > \
                <label for="updValue" class="control-label">Value</label> \
                <input \
                    ng-model="entitySelect.value" \
                    ng-minlength="1" \
                    ng-maxlength="3" \
                    min="0" \
                    ng-pattern="/^[0-9]{1,3}$/" \
                    type="number" class="form-control" id="updValue" name="updValue" /> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <button type="submit" class="btn btn-primary" ng-disabled="!updateForm.$valid">Update</button> \
            </div> \
        </form> \
    </div> \
    </div> \
    ';
    $templateCache.put('basic_modifiers', multiStr);
});