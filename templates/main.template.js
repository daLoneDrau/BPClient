/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <div class="card"> \
        <img class="card-img-top" src="..." alt="Card image cap"> \
        <div class="card-block"> \
            <h4 class="card-title">Card title</h4> \
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p> \
            <a href="#" class="btn btn-primary">Start</a> \
        </div> \
    </div> \
    ';
    $templateCache.put('main', multiStr);
});