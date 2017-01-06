/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
    <!-- Conversion --> \
    <div class="col-sm-10 col-sm-offset-1"> \
        <!-- this form should send a POST request to rest service. --> \
        <!-- Attribute Name --> \
        <div class="form-group"> \
            <label for="txtName" class="control-label col-sm-4">Name</label> \
            <div class="col-sm-8"> \
                <input ng-model="converted.getDisplayName()" ng-model-options="{ getterSetter: true }" type="text" class="form-control" readonly /> \
            </div> \
        </div> \
        <!-- Attribute Description --> \
        <div class="form-group"> \
            <label for="txtDesc" class="control-label col-sm-4">Description</label> \
            <div class="col-sm-8"> \
                <textarea ng-model="converted.getDescription()" ng-model-options="{ getterSetter: true }" cols="40" rows="5" class="form-control"></textarea> \
            </div> \
        </div> \
        <!-- Attribute Abbreviation -->  \
        <div class="form-group" name="divCode"> \
            <label for="txtCode" class="control-label col-sm-4">Abbreviation</label> \
            <div class="col-sm-8"> \
                <input ng-model="converted.getAbbreviation()" ng-model-options="{ getterSetter: true }" type="text" class="form-control" /> \
            </div> \
        </div> \
        <!-- Attribute Base -->  \
        <div class="form-group"> \
            <label class="control-label col-sm-4">Base</label> \
            <div class="col-sm-8"> \
                <input ng-model="converted.getBase()" ng-model-options="{ getterSetter: true }" type="number" class="form-control" /> \
            </div> \
        </div> \
        <!-- Attribute Modifier -->  \
        <div class="form-group"> \
            <label class="control-label col-sm-4">Modifier</label> \
            <div class="col-sm-8"> \
                <input ng-model="converted.getModifier()" ng-model-options="{ getterSetter: true }" type="number" class="form-control" /> \
            </div> \
        </div> \
        <!-- Attribute Full -->  \
        <div class="form-group"> \
            <label class="control-label col-sm-4">Full</label> \
            <div class="col-sm-8"> \
                <input ng-model="converted.getFull()" ng-model-options="{ getterSetter: true }" type="number" class="form-control" /> \
            </div> \
        </div> \
    </div> \
    <!-- List of Current Entities --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <span class="text-muted">Current Attributes: </span><span ng-repeat="entity in entities | orderBy:\'name\'"><span ng-show="!$first">, </span>{{entity.name | uppercase}}</span> \
    </div> \
    <!-- Update Entities Form --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update Attribute</p> \
        <form name="updateForm" class="form-inline" ng-submit="update()" novalidate> \
            <div class="form-group"> <!-- Select Entity --> \
                <label for="selEntity" class="control-label">Choose:</label> \
                <select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.name | uppercase for entity in entities | orderBy:\'name\' track by entity.id"> \
                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
                </select> \
            </div> \
            <div class="form-group"> <!-- Update Name --> \
                <label for="updName" class="control-label">Edit Name</label> \
                <input ng-model="entitySelect.name" type="text" class="form-control" id="updName" name="updName"> \
            </div> \
            <div class="form-group"> <!-- Update Description --> \
                <label for="updDesc" class="control-label">Edit Description</label> \
                <textarea ng-model="entitySelect.description" cols="40" rows="5" class="form-control" id="updDesc" name="updDesc"></textarea> \
            </div> \
            <!-- Update Code -->  \
            <div \
                class="form-group" \
                name="divCode" \
                ng-class="{ \'has-success\': updateForm.updCode.$valid && !updateForm.updCode.$pristine, \'has-error\': updateForm.updCode.$invalid && !updateForm.updCode.$pristine }" > \
                <label for="updCode" class="control-label">Code</label> \
                <input \
                    ng-model="entitySelect.code" \
                    ng-minlength="1"\
                    ng-maxlength="3" \
                    ng-pattern="/^[a-zA-Z]{1,3}$/" \
                    type="text" class="form-control" id="updCode" name="updCode" placeholder="e. g. PER" required /> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <button type="submit" class="btn btn-primary" ng-disabled="!updateForm.$valid">Update</button> \
            </div> \
        </form> \
    </div> \
    </div> \
    ';
    $templateCache.put('attributes', multiStr);
});