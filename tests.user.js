// ==UserScript==
// @name         Show Test Status
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://github.com/tepesware/TepesColors/raw/master/tests.user.js
// @downloadURL https://github.com/tepesware/TepesColors/raw/master/tests.user.js

// @grant        none
// ==/UserScript==

var done = false;
(function () {
    'use strict';



    $('#exec-tests-progressbar').insertAfter('#page');
    $($('.aui-page-header')[1]).insertAfter('#page');
    $('#page').remove();

    var issueId= $('head > meta[name=ajs-issue-key]')[0].content;

    $.ajax({

        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "https://trackspace.lhsystems.com/rest/raven/1.0/testexec/"+issueId+"/test?detailed=true",
        data: "{}",
        dataType: "json",
        success: function (data) {

            var associativeArray = [];

            var entries = data.entries;
            var toDoNotAutomated = 0;
            for (var i = 0; i < entries.length; i++) {

                var lables = entries[i].userColumns.labels;
                var isAutomated = lables.includes("<span>Automated</span>");
                var isscriptNotUpdated =lables.includes("<span>scriptNotUpdated</span>");



                if (!isAutomated || isscriptNotUpdated){
                    if(entries[i].status.name == "TODO"){
                        toDoNotAutomated++;
                    }
                    var executed = entries[i].userColumns.testrun_executed_by;
                    var name = executed.match(/\w+,\s\w+/);
                    associativeArray.push(name);
                }
            };

            associativeArray.sort().reverse();
            var names = _.countBy(associativeArray);

            $('#exec-tests-progressbar > div').append('<span style="color:#A2A6AE" class="testexec-status-count">'+toDoNotAutomated+'</span>');
            $('#exec-tests-progressbar > div').append('<span class="testexec-status-name">MANUAL</span>');

            for (var ent in names) {
                if(ent !="null"){
                    $('#exec-tests-progressbar > h6').after('<p style="margin-left: 10px; line-height: 10px;">'+ent+' '+names[ent]+'</p>');
                }
            }


        },
        error: function (result) {
            console.log("Error " + result);
            //alert("Error");
        }
    });


})();

