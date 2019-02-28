// ==UserScript==
// @name         ChangeSwimlanesJira
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @downloadURL https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @include        /https:\/\/trackspace.lhsystems.com\/secure\/RapidBoard.jspa\?rapidView=2839.*/
// @grant        none
// ==/UserScript==

var done = false;
(function () {
    'use strict';


    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('.ghx-swimlane-header.ghx-done{ background-color: #8bc34a;border-style: groove; border-width:1px;}');
    addGlobalStyle('.ghx-swimlane-header.ghx-done.ghx-selected{ background-color: #8bc34a;border-style: groove; border-width:2px;}');
    addGlobalStyle('.ghx-swimlane-header { background-color: #ffd35161;border-style: groove; border-width:1px;}');
    addGlobalStyle('.ghx-swimlane-header.ghx-selected{ background-color: #F2f292 ;border-style: solid; border-width:2px ;}');
    addGlobalStyle('.ghx-description {\n' +
        '        color: #707070;\n' +
        '        font-size: 12px;\n' +
        '        display: none;\n' +
        '    }');

    addGlobalStyle('.statusesTepes{ float: right;\n' +
        '    margin-right: 50px;}');

    addGlobalStyle('.statusboxDone{' +
        '     border-color: green;\n' +
        // '    border-style: solid;\n' +
        '    border-radius: 3px;\n' +
        '    font-size: 13px;\n' +
        // '    height: 32px;\n' +
        // '    line-height: 32px;\n' +
        '    width: 50px;\n' +
        '    color: #fff;\n' +
        '    cursor: default;\n' +
        '    display: inline-block;\n' +
        '    text-align: center;\n' +
        '    vertical-align: middle;\n' +
        '    background: green; ;}');

    addGlobalStyle('.statusboxInProgress{' +
        '     border-color: orange;\n' +
        // '    border-style: solid;\n' +
        '    border-radius: 3px;\n' +
        '    font-size: 13px;\n' +
        // '    height: 32px;\n' +
        // '    line-height: 32px;\n' ++
        '    width: 50px;\n' +
        '    color: #fff;\n' +
        '    cursor: default;\n' +
        '    display: inline-block;\n' +
        '    text-align: center;\n' +
        '    vertical-align: middle;\n' +
        '    background: orange; ;}');


    addGlobalStyle('.statusboxTodo{' +
        '     border-color: cornflowerblue;\n' +
        // '    border-style: solid;\n' +
        '    border-radius: 3px;\n' +
        '    font-size: 13px;\n' +
        // '    height: 32px;\n' +
        // '    line-height: 32px;\n' +
        '    width: 50px;\n' +
        '    color: #fff;\n' +
        '    cursor: default;\n' +
        '    display: inline-block;\n' +
        '    text-align: center;\n' +
        '    vertical-align: middle;\n' +
        '    background: cornflowerblue; ;}');

    var observer = new MutationObserver(function (mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function (mutation) {
            // debugger
            var message = mutation.type;

            var hasClass = $(mutation.target).hasClass("ghx-loading-pool");


            if (mutation.addedNodes.length > 0) {
                var swimlanes = document.getElementsByClassName("ghx-info");
                if (swimlanes.length > 0) {


                    for (var i = 0; i < swimlanes.length; i++) {
                        if (swimlanes[i].getElementsByTagName("span")[0].textContent == "To Do") {
                            $(document.getElementsByClassName("ghx-info")[i].parentElement.parentElement).css('background-color', "rgba(33, 150, 243, 0.27)");
                        }
                        //var table = $("div[data-swimlane-id]");

                        //debugger;

                    }
                    var rows = $("div[swimlane-id]");
                    var issues = rows.children(".ghx-swimlane-header");
                    fillIssues(issues);

                }
            }

        });
    });


    // Notify me of everything!
    var observerConfig = {
        attributes: false,
        childList: true,
        characterData: false
    };

// Node, config
// In this case we'll listen to all changes to body and child nodes
    var targetNode = document.getElementById("ghx-pool");
    observer.observe(targetNode, observerConfig);


    function fillIssues(issues) {

        for (var i = 0; i < issues.length; i++) {
            // debugger;
            // console.log(issues[i]);
            fillIssue(issues[i]);

        }

    }

    function removeOldStatuses(ussueID) {
        var rows = $(".statusesTepes." + ussueID);
        rows.remove();

    }


    function fillIssue(issue) {

        if (issue.hasAttribute("data-issue-key")) {
            var ussueID = issue.getAttribute("data-issue-key");
            console.log("updateuje issue " + ussueID);

            $.ajax({

                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "https://trackspace.lhsystems.com/rest/api/latest/issue/" + ussueID,
                data: "{}",
                dataType: "json",
                success: function (data) {

                    var subtasks = data.fields.subtasks;
                    var statuses = [];
                    var sumarryLeters = [];
                    for (var i = 0; i < subtasks.length; i++) {
                        statuses.push(subtasks[i].fields.status.name);
                        sumarryLeters.push(subtasks[i].fields.summary.substring(0, 4));
                    }
                    removeOldStatuses(ussueID);
                    addSubtaskRectangles(ussueID, issue, sumarryLeters, statuses);

                },
                error: function (result) {
                    console.log("Error " + result);
                    //alert("Error");
                }
            });
        } else {
            debugger

        }

    }

    function addSubtaskRectangles(ussueID, issue, sumarryLeters, statuses) {

        var text = "";
        var temp = $(issue).children("div.ghx-heading");
        var html = "<span class='statusesTepes ";
        html = html.concat(ussueID);
        html = html.concat("'>");

        var order = ["Done", "In Progress", "To Do"];
        var orderClass = ["statusboxDone", "statusboxInProgress", "statusboxTodo"];


        for (var j = 0; j < order.length; j++) {
            for (var i = 0; i < sumarryLeters.length; i++) {
                if (statuses[i] == order[j]) {
                    html = html.concat(" <span class='" + orderClass[j] + "'>" + sumarryLeters[i] + "</span>");
                }
            }
        }


        html = html.concat("</span>");
        temp.append(html);


    }


})();

