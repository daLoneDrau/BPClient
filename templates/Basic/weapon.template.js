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
	        <!-- Weapon Name --> \
	        <div class="form-group"> \
	            <label for="txtName" class="control-label col-sm-4">Name</label> \
	            <div class="col-sm-8"> \
	                <input class="form-control" id="txtName" name="txtName" type="text" placeholder="e. g. Battle Axe" \
	                        ng-model="newEntity.name"  \
	                        required /> \
	            </div> \
	        </div> \
	        <!-- Weapon Internal Script --> \
	        <div class="form-group"> \
	            <label for="txtScript" class="control-label col-sm-4">Script</label> \
	            <div class="col-sm-8"> \
	                <input class="form-control" id="txtScript" name="txtScript" type="text" placeholder="e. g. BattleAxe" \
	                        ng-model="newEntity.internal_script"  \
	                        required /> \
	            </div> \
	        </div> \
            <!-- Weapon Description --> \
            <div class="form-group"> \
                <label for="txtDesc" class="control-label col-sm-4">Description</label> \
                <div class="col-sm-8"> \
                    <textarea ng-model="newEntity.description" cols="40" rows="5" class="form-control" id="txtDesc" name="txtDesc" required ></textarea> \
                </div> \
            </div> \
            <!-- Weapon Price -->  \
            <div class="form-group" name="divPrice" \
                    ng-class="{ \'has-success\': createForm.txtPrice.$valid && !createForm.txtPrice.$pristine, \'has-error\': createForm.txtPrice.$invalid && !createForm.txtPrice.$pristine }" > \
                <label for="txtPrice" class="control-label col-sm-4">Price</label> \
                <div class="col-sm-8"> \
                    <input class="form-control" id="txtPrice" name="txtPrice" type="number" step="0.1"\
                        ng-model="newEntity.price" \
                        ng-minlength="1"\
                        ng-maxlength="5" \
                        min="0" /> \
                </div> \
            </div> \
            <!-- Weapon Weight -->  \
            <div class="form-group" name="divWeight" \
                    ng-class="{ \'has-success\': createForm.txtWeight.$valid && !createForm.txtWeight.$pristine, \'has-error\': createForm.txtWeight.$invalid && !createForm.txtWeight.$pristine }" > \
                <label for="txtWeight" class="control-label col-sm-4">Weight</label> \
                <div class="col-sm-8"> \
                    <input class="form-control" id="txtWeight" name="txtWeight" type="number" step="0.5"\
                        ng-model="newEntity.weight" \
                        ng-minlength="1"\
                        ng-maxlength="5" \
                        min="0" /> \
                </div> \
            </div> \
	        <!-- Weapon Type --> \
	        <div class="form-group"> \
	            <label for="selType" class="control-label col-sm-4">Weapon Type</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="selType" id="selType" \
	                        ng-model="newEntity.types" \
	                        ng-options="entity as entity.code | uppercase for entity in object_type_entities | orderBy:\'flag\' track by entity.id" \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
	        <!-- Weapon Damage --> \
	        <div class="form-group"> \
	            <label for="selDmg" class="control-label col-sm-4">Damage</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="selDmg" id="selDmg" \
	                        ng-model="newEntity.damages" \
	                        ng-options="entity as entity.code | uppercase for entity in dice_entities | orderBy:[ \'die.code\', \'number\' ] track by entity.id" \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
            <!-- Weapon Groups --> \
            <div class="form-group"> \
                <label for="selGroups" class="control-label col-sm-4">Weapon Groups</label> \
                <div class="col-sm-8"> \
                    <select class="form-control" name="selGroups" id="selGroups" \
                            ng-model="newEntity.groups" \
                            ng-options="entity as entity.name | uppercase for entity in group_entities | orderBy:\'name\' track by entity.id" \
                            multiple \
                            required> \
                        <option value="">---Please select---</option> <!-- not selected / blank option --> \
                    </select> \
                </div> \
            </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <div class="col-sm-8 col-sm-offset-4"> \
                    <button type="submit" class="btn btn-primary" ng-disabled="!createForm.$valid">Add Weapon</button> \
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
        <span class="text-muted">Current Weapons: </span> \
    	<span ng-repeat="entity in entities | orderBy:\'name\'"><span ng-show="!$first">, </span>{{entity.name | uppercase}}</span> \
    </div> \
    <!-- -------------------- --> \
    <!-- Update Entities Form --> \
    <!-- -------------------- --> \
    <div class="col-sm-12"> \
        <hr> \
    </div> \
    <div class="col-sm-12"> \
        <p class="text-muted">Update Weapon</p> \
        <form name="updateForm" class="form-horizontal" ng-submit="update()" novalidate> \
            <div class="form-group"> <!-- Select Entity --> \
                <label for="selEntity" class="control-label col-sm-4">Choose:</label> \
				<div class="col-sm-8"> \
                	<select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.name | uppercase for entity in entities | orderBy:\'types[0].flag\' track by entity.id"> \
                    	<option value="">---Please select---</option> <!-- not selected / blank option --> \
                	</select> \
        		</div> \
        	</div> \
	        <!-- Update Name -->  \
	        <div class="form-group"> \
	            <label for="updName" class="control-label col-sm-4">Name</label> \
				<div class="col-sm-8"> \
	            	<input ng-model="entitySelect.name" type="text" class="form-control" id="updName" name="updName"> \
				</div> \
	        </div> \
	        <!-- Weapon Internal Script --> \
	        <div class="form-group"> \
	            <label for="updScript" class="control-label col-sm-4">Script</label> \
	            <div class="col-sm-8"> \
	                <input class="form-control" id="updScript" name="updScript" type="text" \
	                        ng-model="entitySelect.internal_script"  \
	                        required /> \
	            </div> \
	        </div> \
	        <!-- Update Description -->  \
	        <div class="form-group"> \
	            <label for="updDesc" class="control-label col-sm-4">Description</label> \
				<div class="col-sm-8"> \
    				<textarea ng-model="entitySelect.description" cols="40" rows="5" class="form-control" id="updDesc" name="updDesc" required ></textarea> \
				</div> \
	        </div> \
	        <!-- Update Price -->  \
	        <div class="form-group" name="divUpdPrice" \
	                ng-class="{ \'has-success\': updateForm.updPrice.$valid && !updateForm.updPrice.$pristine, \'has-error\': updateForm.updPrice.$invalid && !updateForm.updPrice.$pristine }" > \
	            <label for="updPrice" class="control-label col-sm-4">Price</label> \
	            <div class="col-sm-8"> \
	                <input class="form-control" id="updPrice" name="updPrice" type="number" step="0.1"\
	                    ng-model="entitySelect.price" \
	                    ng-minlength="1"\
	                    ng-maxlength="5" \
	                    min="0" /> \
	            </div> \
	        </div> \
	        <!-- Update Weight -->  \
	        <div class="form-group" name="divUpdWeight" \
	                ng-class="{ \'has-success\': updateForm.updWeight.$valid && !updateForm.updWeight.$pristine, \'has-error\': updateForm.updWeight.$invalid && !updateForm.updWeight.$pristine }" > \
	            <label for="updWeight" class="control-label col-sm-4">Weight</label> \
	            <div class="col-sm-8"> \
	                <input class="form-control" id="updWeight" name="updWeight" type="number" step="0.5"\
	                    ng-model="entitySelect.weight" \
	                    ng-minlength="1"\
	                    ng-maxlength="5" \
	                    min="0" /> \
	            </div> \
	        </div> \
	        <!-- Update Type --> \
	        <div class="form-group"> \
	            <label for="updType" class="control-label col-sm-4">Type</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="updType" id="updType" \
	                        ng-model="entitySelect.types" \
	                        ng-options="entity as entity.code | uppercase for entity in object_type_entities | orderBy:\'flag\' track by entity.id" \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
	        <!-- Update Damage --> \
	        <div class="form-group"> \
	            <label for="updDmg" class="control-label col-sm-4">Damage</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="updDmg" id="updDmg" \
	                        ng-model="entitySelect.damages" \
	                        ng-options="entity as entity.code | uppercase for entity in dice_entities | orderBy:[ \'die.code\', \'number\' ] track by entity.id" \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
	        <!-- Update Groups --> \
	        <div class="form-group"> \
	            <label for="updGroups" class="control-label col-sm-4">Groups</label> \
	            <div class="col-sm-8"> \
	                <select class="form-control" name="updGroups" id="updGroups" \
	                        ng-model="entitySelect.groups" \
	                        ng-options="entity as entity.name | uppercase for entity in group_entities | orderBy:\'name\' track by entity.id" \
	                        multiple \
	                        required> \
	                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
	                </select> \
	            </div> \
	        </div> \
            <!-- Submit Button --> \
            <div class="form-group"> \
                <button type="submit" class="btn btn-primary" ng-disabled="!updateForm.$valid">Update</button> \
            </div> \
        </form> \
    </div> \
    </div> \
    ';
    $templateCache.put('basic_weapons', multiStr);
});