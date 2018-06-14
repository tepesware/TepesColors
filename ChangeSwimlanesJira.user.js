// ==UserScript==
// @name         ChangeSwimlanesJira
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @downloadURL https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @include        /https:\/\/trackspace.lhsystems.com\/secure\/RapidBoard.jspa\?rapidView=2839.*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    addGlobalStyle('.ghx-swimlane-header.ghx-done{ background-color: #0f9d58;border-style: groove; border-width:1px;}');
    addGlobalStyle('.ghx-swimlane-header.ghx-done.ghx-selected{ background-color: #0f9d58;border-style: groove; border-width:2px;}');
    addGlobalStyle('.ghx-swimlane-header { background-color: #F2f292;border-style: groove; border-width:1px;}');
    addGlobalStyle('.ghx-swimlane-header.ghx-selected{ background-color: #F2f292 ;border-style: solid; border-width:2px ;}');



})();