// ==UserScript==
// @name         ChangeSwimlanesJira
// @namespace    http://tampermonkey.net/
// @version      1.9
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
    addGlobalStyle('.ghx-swimlane-header { background-color: #00bdf7f2;border-style: groove; border-width:1px;}');
    addGlobalStyle('.ghx-swimlane-header.ghx-selected{ background-color: #0052cc7a ;border-style: solid; border-width:2px ;}');
    addGlobalStyle('.ghx-description {\n' +
        '        color: #707070;\n' +
        '        font-size: 12px;\n' +
        '        display: none;\n' +
        '    }');
    addGlobalStyle('.ghx-swimlane-header .ghx-heading{\n' +
        '    display: inline-block;\n' +
        '    margin: 10px 0;\n' +
        '    vertical-align: middle;\n' +
        '    width: 100%;\n' +
        '    white-space: normal;\n' +
        '}')



    addGlobalStyle('.statusesTepes{ float: right;\n' +
        '    margin-right: 25px;\n' +
        '    white-space: normal;\n' +
        '}');

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
        '    background: #00875A; ;}');

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
        '    background: #0052cc ;}');


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
        '    background: #42526e; }');

    addGlobalStyle('.ghx-avatarTepes-img{' +
        '        -webkit-border-radius: 3px;\n' +
        '        border-radius: 3px;\n' +
        '        font-size: 24px;\n' +
        '        height: 24px;\n' +
        '        line-height: 24px;\n' +
        '        width: 24px;\n' +
        '        color: #fff;\n' +
        '        cursor: default;\n' +
        '        display: inline-block;\n' +
        '        text-align: center;\n' +
        '        text-transform: uppercase;\n' +
        '        vertical-align: middle;\n' +
        '        float: left;\n' +
        '        margin-right: 5px;\n' +
        '    }');

    addGlobalStyle('.ghx-swimlane-header:after {\n' +
        '    background-color: #fff;\n' +
        '    -webkit-box-shadow: -5px 0 10px 5px #fff;\n' +
        '    box-shadow: -5px 0 10px 5px #fff;\n' +
        '    content: none; \n' +
        '    height: 100%;\n' +
        '    position: absolute;\n' +
        '    right: 0;\n' +
        '    width: 0px;\n' +
        '}');


    var observer = new MutationObserver(function (mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function (mutation) {

            var message = mutation.type;




            if (mutation.addedNodes.length > 0) {
                var swimlanes = document.getElementsByClassName("ghx-info");
                if (swimlanes.length > 0) {


                    for (var i = 0; i < swimlanes.length; i++) {
                        if (swimlanes[i].getElementsByTagName("span")[0].textContent == "To Do") {
                            $(document.getElementsByClassName("ghx-info")[i].parentElement.parentElement).css('background-color', "#dfe1e5");
                        }
                        //var table = $("div[data-swimlane-id]");



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
    var targetNode = document.getElementById("ghx-work");

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
                    addAssigneField(data.fields.assignee.avatarUrls, issue);
                    addSubtaskRectangles(ussueID, issue, sumarryLeters, statuses);


                },
                error: function (result) {
                    console.log("Error " + result);
                    //alert("Error");
                }
            });
        } else {


        }

    }

    function addAssigneField(avatarsArray, issue) {
        var text = "";
        var temp = $(issue).children("div.ghx-heading");

        var html = "<img class='ghx-avatarTepes-img' src='";
        var avatarUrl= avatarsArray['48x48'];
        html = html.concat(avatarUrl);
        html = html.concat("'>");
        //debugger;
        temp.prepend(html);

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

