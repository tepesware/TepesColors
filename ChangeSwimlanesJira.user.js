// ==UserScript==
// @name         ChangeSwimlanesJira
// @namespace    http://tampermonkey.net/
// @version      1.3
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
    addGlobalStyle('.statuses{ float: right;\n' +
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
            debugger
            var message = mutation.type;
            console.log("FFF" + message);


            var hasClass = $(mutation.target).hasClass("ghx-loading-pool");

            if(hasClass){
                done = false;
            }
            if (mutation.addedNodes.length == 0 && mutation.type == "attributes" && !hasClass && !done) {
                var swimlanes = document.getElementsByClassName("ghx-info");
                if (swimlanes.length > 0) {

                    for (var i = 0; i < swimlanes.length; i++) {
                        if (swimlanes[i].getElementsByTagName("span")[0].textContent == "To Do") {
                            $(document.getElementsByClassName("ghx-info")[i].parentElement.parentElement).css('background-color', "rgba(33, 150, 243, 0.27)");
                        }
                        //var table = $("div[data-swimlane-id]");
                        var rows = $("div[swimlane-id]");
                        //debugger;

                    }
                    var issues = rows.children(".ghx-swimlane-header");
                    fillIssues(issues);
                    done = true;
                }
            }

        });
    });


    // Notify me of everything!
    var observerConfig = {
        attributes: true,
        childList: false,
        characterData: false
    };

// Node, config
// In this case we'll listen to all changes to body and child nodes
    var targetNode = document.body;
    observer.observe(targetNode, observerConfig);


    function fillIssues(issues) {

        for (var i = 0; i < issues.length; i++) {
            // debugger;
            console.log(issues[i]);
            fillIssue(issues[i]);

        }

    }


    function fillIssue(issue) {
        var ussueID = issue.getAttribute("data-issue-key");
        //<span>7 subs</span>

        console.log("updateuje issue" + ussueID);
        if (issue != null) {


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
                    addSubtaskRectangles(issue, sumarryLeters, statuses);

                },
                error: function (result) {
                    console.log("Error " + result);
                    //alert("Error");
                }
            });
        }

    }

    function addSubtaskRectangles(issue, sumarryLeters, statuses) {

        var text = "";
        var temp = $(issue).children("div.ghx-heading");
        var html = "<span class='statuses'>";

        for (var i = 0; i < sumarryLeters.length; i++) {

            if (statuses[i] == "Done") {
                html = html.concat(" <span class='statusboxDone'>" + sumarryLeters[i] + "</span>");
            }
        }
        for (i = 0; i < sumarryLeters.length; i++) {
            if (statuses[i] == "In Progress") {
                html = html.concat(" <span class='statusboxInProgress'>" + sumarryLeters[i] + "</span>");
            }
        }
        for (i = 0; i < sumarryLeters.length; i++) {
            if (statuses[i] == "To Do") {
                html = html.concat(" <span class='statusboxTodo'>" + sumarryLeters[i] + "</span>");
            }
        }

        html = html.concat("</span>");
        temp.append(html);


    }


})();

