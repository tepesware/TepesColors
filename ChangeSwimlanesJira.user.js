// ==UserScript==
// @name         ChangeSwimlanesJira
// @namespace    http://tampermonkey.net/
// @version      3.1.1
// @description  try to take over the world!
// @author       WLAD
// @updateSite https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @downloadURL https://github.com/tepesware/TepesColors/raw/master/ChangeSwimlanesJira.user.js
// @require      https://raw.githubusercontent.com/dchester/jsonpath/master/jsonpath.js
// @require      https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/waitForKeyElements.js
// @include        /https:\/\/trackspace.lhsystems.com\/secure\/RapidBoard.jspa\?rapidView=2839.*/
// The CSS file, use file:/// for local CSS files.
// @resource    customCSS   https://github.com/tepesware/TepesColors/raw/master/ChangeJiraSwim.css
// @grant         GM_getResourceText
// @grant      GM_addStyle
// ==/UserScript==


var done = false;


(function () {
    'use strict';

    console.debug('start: add CSS');
    var cssTxt = GM_getResourceText("customCSS");
    GM_addStyle(cssTxt);
    console.debug('done: add CSS');

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


    function addIssueAdditionalInfo(issue, ussueID, data, parrsedSubtasks) {
        var temp = $(issue).children("div.ghx-heading");
        var html = "<span class='issueInfo ";
        html = html.concat(ussueID);
        html = html.concat("'>");
        var subtaskHtml = addSubtaskRectangles(ussueID, data.fields.assignee.avatarUrls, parrsedSubtasks);
        console.log(subtaskHtml);
        html = html.concat(addPR(data.fields.customfield_25700));
        html = html.concat(subtaskHtml);

        html = html.concat("</span>");
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

                        var avatarForSubtask = getAssigneAvatarForIssue(subtasks[i].key);

                        var subtask = new Subtask(subtasks[i].fields.status.name, subtasks[i].fields.summary.substring(0, 6), subtasks[i].key, avatarForSubtask);
                        parrsedSubtasks.push(subtask);
                    }
                    removeOldStatuses(ussueID);
                    addAssigneField(data.fields.assignee.avatarUrls, issue);

                    addPoints(data.fields.customfield_10233, issue);


                    addIssueAdditionalInfo(issue, ussueID, data, parrsedSubtasks);

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
        var avatarUrl = avatarsArray['32x32'];
        html = html.concat(avatarUrl);
        html = html.concat("'>");
        //debugger;
        temp.prepend(html);

    }

    function isABot(avatarUrl) {
        return ("" + avatarUrl).contains("ermbot");
    }

    function addSubtaskRectangles(ussueID, avatarsArray, parrseedSubtasks) {

        var text = "";

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
                    var size = "";
                    if (order[j] === "In Progress") {
                        size = "-Big";
                    }


                    html = html.concat("<span class='tepes-avatar-inner" + size + "'>");

                    if (order[j] != "In Progress" || isABot(avatarUrl)) {

                        avatarUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
                        console.log("PUSTY " + order[j]);

                    } else {
                        html = html.concat("<img src='" + avatarUrl + "'></img>");
                    }
                    // if(j ===1 ){

                    // }

                    html = html.concat("</span></span>");

                }
            }
        }


        html = html.concat("</span>");
        return html;


    }

    function addPoints(storyPoints, issue) {

        var text = "";
        var temp = $(issue).find("div.ghx-heading > span.ghx-info")
        var html = "<span class='storyPoints ";
        html = html.concat("'>" + storyPoints);
        html = html.concat("</span>");
        temp.prepend(html);

    }

    function addPR(prStatus, htmlParrent) {

        var status = prStatus.match("PullRequest.*state='(.*?)'")[1];

        var html = "<span class='aui-lozenge aui-lozenge-overflow aui-lozenge-subtle aui-lozenge-success  pullrequest-state'>";
        if (status === "MERGED") {

            html = html.concat(status);
            html = html.concat("</span>");
            return html;
        } else if (status === "OPEN") {
            var stateCount = prStatus.match("PullRequest.*{stateCount=(.*?),")[1];
            if (stateCount > 0) {
                html = html.concat(status);
                html = html.concat("</span>");
                return html;
            }
        }
        return "";
    }

    function getAssigneAvatarForIssue(key) {
        var result;
        // debugger;
        result = jsonpath.query(allData, "$.issuesData.issues[?(@.key=='" + key + "')].avatarUrl");
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

