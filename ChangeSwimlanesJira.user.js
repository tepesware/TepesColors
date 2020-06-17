// ==UserScript==
// @name         ChangeSwimlanesJira
// @namespace    http://tampermonkey.net/
// @version      2.7.3
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @downloadURL https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @require      https://raw.githubusercontent.com/dchester/jsonpath/master/jsonpath.js
// @require      https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/waitForKeyElements.js
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
        '    padding: 0px 0px 0px 10px;\n' +
        '    vertical-align: middle;\n' +
        '    width: 100%;\n' +
        '    white-space: normal;\n' +
        '}')


    addGlobalStyle('.statusesTepes{ float: right;\n' +
        '    margin-right: 15px;\n' +
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
        '    height: 50px;\n' +


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
        '    height: 70px;\n' +
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
        '    height: 50px;\n' +
        '    color: #fff;\n' +
        '    cursor: default;\n' +
        '    display: inline-block;\n' +
        '    text-align: center;\n' +
        '    vertical-align: middle;\n' +
        '    background: #99999990;}');

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

    addGlobalStyle('.testexec-status-name {\n' +
        '    margin-left: 4px;\n' +
        '    color: #fff;\n' +
        '    margin-right: 20px;    ' +
        '   font-variant: all-small-caps;\n' +
        '}');

    addGlobalStyle('.testexec-status-block {\n' +
        '    display: initial;\n' +
        '    background-color: black;\n' +
        '    float: right;\n    ' +
        '    border: 0 solid #42526e;\n' +
        '    border-radius: 3px;\n' +
        '    padding-left: 10px;\n' +
        '    margin-right: 10px;' +

        '}');

    addGlobalStyle(".storyPoints {    font-weight: 1000;\n" +
        "    vertical-align: middle;\n" +
        "    margin: 0px 10px 0 0px;\n" +
        "    border: 0 solid #42526e;\n" +
        "    border-radius: 3px;\n" +
        "    background-color: rgba(255,255,255,.15);\n" +
        "    border-color: #deebff;\n" +
        "    color: #0747a6;\n" +
        "       padding: 2px 10px 2px;" +
        "}");
    addGlobalStyle(".pullrequest-state {\n" +
        "    float: right;\n" +
        "   margin: 10px 10px 0px 4px;\n" +
        "   mix-blend-mode: soft-light;\n" +
        "}");

    addGlobalStyle(".tepes-avatar-inner {\n" +
        '     height: 32px;\n' +

        '        width: 32px;\n' +
        "}");
    addGlobalStyle(".tepes-avatar-inner-Big {\n" +
        ' height: 48px;\n' +
        ' width: 48px;\n' +
        "}");
    addGlobalStyle(".tepes-avatar-inner-Big img {\n" +
        'width: 48px;\n' +
        'height: 48px;\n' +
        "}");
    addGlobalStyle(".tepes-avatar-inner img {\n" +
        'width: 28px;\n' +
        'height: 26px;\n' +
        "}");

    addGlobalStyle(".ghx-rapid-views #gh #ghx-work #ghx-pool-column .ghx-swimlane .ghx-swimlane-header .ghx-summary {\n" +
        "    overflow: hidden;\n" +
        "    text-overflow: ellipsis;\n" +
        "    font-size: 20px;");



var allData;

    var observer = new MutationObserver(function (mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function (mutation) {

            var message = mutation.type;

            //debugger;

            if (mutation.addedNodes.length > 0) {
                observer.disconnect();
                registerContentObserver();
                updateTheBoard();
            }

        });
    });

    function registerContentObserver() {
        var observer = new MutationObserver(function (mutations) {

            mutations.forEach(function (mutation) {

                var message = mutation.type;
                //debugger;
                if (mutation.addedNodes.length > 0) {

                    updateTheBoard();
                }
            });
        });

        var targetNode = document.getElementById("ghx-pool");
        observer.observe(targetNode, observerConfig);

    }

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

    function getAllData() {
        const url = "https://trackspace.lhsystems.com/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=2839"
        var result;
        $.ajax({

            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: "{}",
            dataType: "json",
            success: function (data) {

                console.log("all data " + data);
                 allData = (data);
                },
            error: function (result) {
                console.log("Error " + result);
                //alert("Error");
            },
            async: false
        });

    }

    function updateTheBoard() {

        getAllData();


        var swimlanes = document.getElementsByClassName("ghx-info");
        if (swimlanes.length > 0) {

            for (var i = 0; i < swimlanes.length; i++) {
                if (swimlanes[i].getElementsByTagName("span")[0].textContent == "To Do") {
                    $(document.getElementsByClassName("ghx-info")[i].parentElement.parentElement).css('background-color', "#dfe1e5");
                }

            }
            var rows = $("div[swimlane-id]");
            var issues = rows.children(".ghx-swimlane-header");
            fillIssues(issues);
        }
    }

    function removeOldStatuses(ussueID) {
        var rows = $(".statusesTepes." + ussueID);
        rows.remove();

    }


    function addTestExecutionSummary(issue, stat) {
        //debugger
        var temp = $(issue).children("div.ghx-heading");
        var html = "<div class=\"testexec-status-block\">";
        var statuses = stat.statuses;
        for (var i = 0; i < statuses.length; i++) {
            if (statuses[i].statusCount > 0) {
                html = html.concat("<span style=\"color:");
                html = html.concat(statuses[i].color).concat("\" class=\"testexec-status-count\">");
                html = html.concat(statuses[i].statusCount).concat("</span><span class=\"testexec-status-name\">");
                html = html.concat(statuses[i].name).concat("</span>");
            }
        }

        html = html.concat("</div>");
        temp.append(html);
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
                    var parrsedSubtasks = [];
                    for (var i = 0; i < subtasks.length; i++) {

                         var avatarForSubtask  = getAssigneAvatarForIssue(subtasks[i].key);

                       var subtask =  new Subtask(subtasks[i].fields.status.name, subtasks[i].fields.summary.substring(0, 6), subtasks[i].key, avatarForSubtask);
                       parrsedSubtasks.push(subtask);
                    }
                    removeOldStatuses(ussueID);
                   // addAssigneField(data.fields.assignee.avatarUrls, issue);

                    addPoints(data.fields.customfield_10233, issue);

                    addSubtaskRectangles(ussueID, issue, data.fields.assignee.avatarUrls, parrsedSubtasks);

                    addPR(data.fields.customfield_25700, issue);


                    if (data.fields.issuetype.id === "10202") {
                        addTestExecutionSummary(issue, data.fields.customfield_17918);
                    }


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
        var avatarUrl = avatarsArray['48x48'];
        html = html.concat(avatarUrl);
        html = html.concat("'>");
        //debugger;
        temp.prepend(html);

    }

    function isABot(avatarUrl) {
        return ("" + avatarUrl).contains("ermbot");
    }

    function addSubtaskRectangles(ussueID, issue, avatarsArray, parrseedSubtasks) {

        var text = "";
        var temp = $(issue).children("div.ghx-heading");
        var html = "<span class='statusesTepes ";
        html = html.concat(ussueID);
        html = html.concat("'>");

        var order = ["Done", "In Progress", "To Do"];
        var orderClass = ["statusboxDone", "statusboxInProgress", "statusboxTodo"];


        for (var j = 0; j < order.length; j++) {
            for (var i = 0; i < parrseedSubtasks.length; i++) {
                if (parrseedSubtasks[i].status === order[j]) {



                    html = html.concat(" <span class='" + orderClass[j] + "'>" + parrseedSubtasks[i].name);
                    var avatarUrl = parrseedSubtasks[i].avatarForSubtask;
                    var size ="";
                    if(order[j] === "In Progress"){
                        size = "-Big";
                    }


                    html = html.concat("<span class='tepes-avatar-inner"+size+"'>");
                    console.log("Avatar dla "+ussueID +" "+avatarUrl);
                    console.log(typeof avatarUrl)
                    console.log(" "+order[j]);
                    if(order[j] != "In Progress" || isABot(avatarUrl) ) {

                        avatarUrl ="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
                        console.log("PUSTY "+order[j]);

                    }
                    else{
                        html = html.concat("<img src='" + avatarUrl + "'></img>");
                    }
                    // if(j ===1 ){

                    // }

                    html = html.concat("</span></span>");

                }
            }
        }


        html = html.concat("</span>");
        temp.append(html);


    }

    function addPoints(storyPoints, issue) {

        var text = "";
        var temp = $(issue).find("div.ghx-heading > span.ghx-info")
        var html = "<span class='storyPoints ";
        html = html.concat("'>" + storyPoints);
        html = html.concat("</span>");
        temp.prepend(html);

    }

    function addPR(prStatus, issue) {

        var status = prStatus.match("PullRequest.*state='(.*?)'")[1];

        var temp = $(issue).children("div.ghx-heading");
        var html = "<span class='aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-success  pullrequest-state'>";
        if (status === "MERGED") {

            html = html.concat(status);
            html = html.concat("</span>");
            temp.append(html);
        } else if (status === "OPEN") {
            var stateCount = prStatus.match("PullRequest.*{stateCount=(.*?),")[1];
            if (stateCount > 0) {
                html = html.concat(status);
                html = html.concat("</span>");
                temp.append(html);
            }
        }
    }
    function getAssigneAvatarForIssue(key) {
        var result;
       // debugger;
        result = jsonpath.query(allData, "$.issuesData.issues[?(@.key=='"+key+"')].avatarUrl");
        return result;
    }


    class Subtask {
        constructor(status, name, key, avatarForSubtask) {
            this.status = status;
            this.name = name;
            this.key = key;
            this.avatarForSubtask = avatarForSubtask;
        }

    }

})();

