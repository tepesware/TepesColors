// ==UserScript==
// @name         Remove Automated rows
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  try to take over the world!
// @author       WLAD
// @updateSite   https://raw.githubusercontent.com/tepesware/TepesColors/master/RemoveAutomatedRows.user.js
// @downloadURL  https://raw.githubusercontent.com/tepesware/TepesColors/master/RemoveAutomatedRows.user.js
// @include        /https:\/\/trackspace.lhsystems.com\/browse\/ERMAMM.*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   function updateManualTestNumber(){
        var issueId= $('head > meta[name=ajs-issue-key]')[0].content;

    $.ajax({

        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "https://trackspace.lhsystems.com/rest/raven/1.0/api/testexec/"+issueId+"/test?detailed=true",
        data: "{}",
        dataType: "json",
        success: function (data) {

            var entries = data.entries;
            var toDoNotAutomated = 0;
            for (var i = 0; i < entries.length; i++) {
                if(entries[i].status.name == "TODO"){
                    var lables = entries[i].userColumns.labels;
                    var isAutomated = lables.includes("<span>Automated</span>");
                    var isscriptNotUpdated =lables.includes("<span>scriptNotUpdated</span>");
                    if (!isAutomated || isscriptNotUpdated){
                        toDoNotAutomated++;
                    }
                };

            }
            $('#exec-tests-progressbar > div').append('<span style="color:#A2A6AE" class="testexec-status-count">'+toDoNotAutomated+'</span>');
            $('#exec-tests-progressbar > div').append('<span class="testexec-status-name">MANUAL</span>');
            console.log("Liczba automated " + toDoNotAutomated);
        },
        error: function (result) {
            console.log("Error " + result);
            //alert("Error");
        }
    });
   }



    var observer = new MutationObserver(function (mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function (mutation) {
            // debugger


            if (mutation.addedNodes.length > 0) {
                console.log(mutation.target);

                $('.lozenge[title="Automated"]').closest('tr').not($('.lozenge[title="scriptNotUpdated"]').closest('tr')).remove();		
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
    debugger
    if(targetNode != null){
        observer.observe(targetNode, observerConfig);
        updateManualTestNumber();
    }


})();
