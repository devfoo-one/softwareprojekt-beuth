/**
 * SESSION VARIABLES
 * =================
 *
 * timeline.startDate : Date object that contains the first day of view
 * timeline.draggedProjectID : project that got dragged onto timeline
 * timeline.draggedEmployeeID : employee a project got dragged onto
 * timeline.draggedDate : startDate of the cell a project got dragged onto
 * timeline.engagementToEdit: Engagement, whose edit button has been clicked
 */

Template.timeline.helpers({
    employees: function() {
        return Employees.find();
    },
    projects: function() {
        return Projects.find();
    }
});

/**
 * get a list of all engagements in a week for one given employeeId
 * @param  {Object} queryAttributes {employeeId, startDate}
 * @return {[Object]}               {projectId, percent}
 */
getEngagementsForWeek = function(queryAttributes) {
    var user = Meteor.user();

    // ensure that the user is logged in
    if (!user) { return []; }

    if(queryAttributes.employeeId !== undefined &&
       queryAttributes.startDate instanceof Date )
    {
        // get the monday of the week queried
        var startingWeek = moment(queryAttributes.startDate).day("Monday").toDate();
        var engagementsInWeek = Engagements.find({
            employeeId: queryAttributes.employeeId,
            startDate: startingWeek
        });
        var employee = Employees.findOne({ _id: queryAttributes.employeeId });
        var getProjectById = function(id) {
            return Projects.findOne({_id: id});
        };
        if (employee) {
            var employeeWorkTime = employee.workTime || 1;
            var result = [];
            engagementsInWeek.forEach( function(entry) {
                var project = getProjectById(entry.projectId);
                result.push({
                    engagementId : entry._id,
                    projectId: entry.projectId,
                    projectShortName: project.shortName,
                    projectTitle: project.title,
                    percent: (entry.duration / employeeWorkTime * 100).toFixed(2)
                });
            });
            return result;
        }
        else {
            // employee was not found
            console.error("Queried employee could not be found!");
        }
    }
    return [];
};

// this query: getEngagementsForWeek({employeeId: bendersID, startDate: new Date(2015, 05, 02)});
// should return an array with two objects in it


Template.timeline.rendered = function(){
    var _timelineInstance = this;
    var firstDayOfWeek = moment().startOf("week").add(1,"day").toDate(); //add because week seems to start on sundays
    // var firstDayOfWeek = moment().day("Monday").toDate();
    Session.set("timeline.startDate", firstDayOfWeek);
    /* scroll left */
    $('#timeline-btn-scroll-left').click(function(){
        Session.set("timeline.startDate",moment(Session.get("timeline.startDate")).subtract(1, "week").toDate());
    });
    /* scroll right */
    $('#timeline-btn-scroll-right').click(function(){
        Session.set("timeline.startDate",moment(Session.get("timeline.startDate")).add(1, "week").toDate());
    });
    $('.timeline-project-list-item').draggable({
        revert: true,
        snap: false,
        zIndex: 100,
    });
    $('.timeline-cell-week').droppable({
        activeClass: "timeline-cell-week-highlight",
        drop: function( event, ui ) {
            var projectID = ui.draggable.attr('data-projectid');
            var employeeID = $(this).attr('data-employeeid');
            var weekOffset = $(this).attr('data-weekoffset');
            var startDate = moment(Session.get("timeline.startDate")).add(weekOffset, "w").toDate();
            Session.set("timeline.draggedProjectID", projectID);
            Session.set("timeline.draggedEmployeeID", employeeID);
            Session.set("timeline.draggedDate", startDate);
            createModal(Template.addNewEngagementModal,"#addNewEngagementModal", _timelineInstance.lastNode);
            // console.log("Project " + projectID + " got dragged onto Employee " + employeeID + " Assignment should start on " + startDate);
        }
    });
};

Template.timeline.events({
    'mouseenter .timeline-project-bar': function(e) {
        $(e.target).addClass('timeline-project-bar-hover'); //hover color
        $(e.target).children('.timeline-project-bar-editbtn').show();
        $(e.target).children('.timeline-project-bar-deletebtn').show();
    },
    'mouseleave .timeline-project-bar': function(e) {
        $(e.target).removeClass('timeline-project-bar-hover');
        $(e.target).children('.timeline-project-bar-editbtn').hide();
        $(e.target).children('.timeline-project-bar-deletebtn').hide();
    },
    /* edit engagement */
    'click .timeline-project-bar-editbtn': function(e) {
        var engagementId = $(e.target).closest('.timeline-project-bar').attr('data-assignmentid');
        Session.set('timeline.engagementToEdit', Engagements.findOne({_id: engagementId}));
        createModal(Template.editEngagementModal, "#editEngagementModal", Template.instance().lastNode);
    },
    /* delete engagement */
    'click .timeline-project-bar-deletebtn': function(e) {
        var engagementId = $(e.target).closest('.timeline-project-bar').attr('data-assignmentid');
        var onOK = function() {
            Meteor.call('deleteEngagement', engagementId, function(error) {
                if(error) {
                    return alert(error.reason);
                }
            });
        };
        var buttonLabels = {
            ok: "Delete engagement",
            cancel: "Cancel"
        };
        var warningHeader = "Delete engagement?";
        var warningMessage = "Are you sure you want to delete the engagement? This cannot be undone!";
        showWarning(warningHeader, warningMessage, onOK, buttonLabels);
    }
});

Template.timelineHeader.helpers({
    /**
     * returns weeknumber + increment (for table header)
     *
     * @param  {Number} increment weeks to increment
     * @return {String} week number
     */
    getWeekNumber: function(increment) {
        var startDate = moment(Session.get("timeline.startDate"));
        return startDate.add(increment,"week").format("WW");
    }
});

Template.timelineRow.helpers({
    /**
     * returns project bars for employee at startweek + increment
     * @param  {EmployeeID} employeeID employeeID
     * @param  {Number} increment  timeline.startDate + increment
     * @return {String}            HTML String that contains divs
     */
    getProjectBars: function(increment) {
        var employeeID = Template.currentData()._id;
        var startDate = Session.get("timeline.startDate");
        var queryDate = moment(startDate).add(increment, "w").toDate();
        var assignments = getEngagementsForWeek({
            employeeId: employeeID,
            startDate: queryDate
        });
        var htmlReturn = "";
        assignments.forEach(function(value) {
            var percent = Math.floor(value.percent);
            var engagementId = value.engagementId;
            var projectId = value.projectId;
            var projectShortName = value.projectShortName;
            var project = Projects.findOne({_id: projectId});
            var color = project.color;
            htmlReturn =
                htmlReturn +
                '<div style="width:' +
                percent +
                '%; background-color:' +
                color +
                ';" class="timeline-project-bar timeline-project-bar-green" data-assignmentid="' +
                engagementId +
                '">' +
                '<span class="timeline-project-bar-editbtn pull-left glyphicon glyphicon-pencil"></span>' +
                projectShortName +
                '<span class="timeline-project-bar-deletebtn pull-right glyphicon glyphicon-trash"></span>' +
                '</div>';
        });
        return htmlReturn;
    },


    getEmployeeLoad: function() {
        var employeeID = Template.currentData()._id;
        var startDate = Session.get("timeline.startDate");

        var total = 0;
        for(var i = 0; i < 4; i++) {
            var queryDate = moment(startDate).add(i, "w").toDate();
            var assignments = getEngagementsForWeek({
                employeeId: employeeID,
                startDate: queryDate
            });

            assignments.forEach(function(value) {
                total += parseFloat(value.percent);
            });
        }

        return total / 400 * 100;
    }
});
