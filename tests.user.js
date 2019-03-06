// ==UserScript==
// @name         Show Test Status
// @namespace    http://tampermonkey.net/
// @version      1.1
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

                    var entries = data.entries;
                    var toDoNotAutomated = 0;
                    for (var i = 0; i < entries.length; i++) {
                        if(entries[i].status.name == "TODO"){
                            var lables = entries[i].userColumns.labels;
                            var isAutomated = lables.includes("<span>Automated</span>");
                            if (!isAutomated){
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


})();

