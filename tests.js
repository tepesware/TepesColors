// ==UserScript==
// @name         Show Test Status
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://github.com/tepesware/TepesColors/raw/master/tests.js
// @downloadURL https://github.com/tepesware/TepesColors/raw/master/tests.js

// @grant        none
// ==/UserScript==

var done = false;
(function () {
    'use strict';



    $('#exec-tests-progressbar').insertAfter('#page');
    $($('.aui-page-header')[1]).insertAfter('#page');
    $('#page').remove();

})();

