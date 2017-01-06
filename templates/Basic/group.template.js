/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
    <!-- Add Entity Form --> \
    <div class="col-sm-10 col-sm-offset-1"> \
        <!-- this form should send a POST request to rest service. --> \
        <form class="form-horizontal" ng-submit="create()"> \
            <div class="form-group"> <!-- Group Name --> \
                <label for="txtName" class="control-label col-sm-4">Group Name</label> \
                <div class="col-sm-8"> \
                    <input ng-model="divName" type="text" class="form-control" id="txtName" name="txtName" placeholder="e. g. SKIING ENTHUSIASTS"> \
                </div> \
            </div> \
            <div class="form-group"> <!-- Submit Button --> \
                <div class="col-sm-8 col-sm-offset-4"> \
                    <button type="submit" class="btn btn-primary">Add Group</button> \
                </div> \
            </div> \
        </form> \
    </div> \
    <!-- List of Current Entities --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <span class="text-muted">Current Groups: </span><span ng-repeat="entity in entities | orderBy:\'name\'"><span ng-show="!$first">, </span>{{entity.name | uppercase}}</span> \
    </div> \
    <!-- Update Entities Form --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update</p> \
        <form class="form-inline" ng-submit="update()"> \
            <div class="form-group"> <!-- Select Group --> \
                <label for="selGroup" class="control-label">Select Group</label> \
                    <select class="form-control" name="selGroup" id="selGroup" ng-model="groupSelect" ng-options="item as item.name | uppercase for item in entities | orderBy:\'name\' track by item.id"> \
                        <option value="">---Please select---</option> <!-- not selected / blank option --> \
                    </select> \
            </div> \
            <div class="form-group"> <!-- Update Name --> \
                <label for="txtName" class="control-label">Edit Name</label> \
                    <input ng-model="groupSelect.name" type="text" class="form-control" id="groupSelect" name="groupSelect"> \
            </div> \
            <div class="form-group"> <!-- Submit Button --> \
                    <button type="submit" class="btn btn-primary">Update Group</button> \
            </div> \
        </form> \
        </div> \
    </div> \
    </div> \
    ';
    $templateCache.put('basic_groups', multiStr);
});