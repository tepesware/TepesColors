// ==UserScript==
// @name         Remove Automated rows
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://raw.githubusercontent.com/tepesware/TepesColors/master/RemoveAutomatedRows.js
// @downloadURL https://raw.githubusercontent.com/tepesware/TepesColors/master/RemoveAutomatedRows.js
// @match        none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';





    var observer = new MutationObserver(function (mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function (mutation) {
            // debugger





            if (mutation.addedNodes.length > 0) {
                console.log(mutation.target);
                $('.lozenge[title="Automated"]').closest('tr').remove();

            }

        });
    });


    // Notify me of everything!
    var observerConfig = {
        attributes: false,
        childList: true,
        characterData: false,
        subtree:true
    };

// Node, config
// In this case we'll listen to all changes to body and child nodes
    var targetNode = document.getElementById("testexec-tests-table-wrapper");
    // debugger
    observer.observe(targetNode, observerConfig);


})();