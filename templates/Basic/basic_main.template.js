/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <!-- Add Entity Form --> \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
        BASIC MAIN \
    </div> \
    ';
    $templateCache.put('basic_main', multiStr);
});