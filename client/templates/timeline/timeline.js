/**
 * SESSION VARIABLES
 * =================
 *
 * timeline-startDate : Date object that contains the first day of view
 */

Template.timeline.helpers({
    employees: function() {
        return Employees.find();
    },
    projects: function() {
        return Projects.find();
    }

});

Template.timeline.rendered = function(){
    var firstDayOfWeek = moment().startOf("week").add(1,"day").toDate(); //add because week seems to start on sundays
    Session.set("timeline-startDate", firstDayOfWeek);

    /* scroll left */
    $('#timeline-btn-scroll-left').click(function(){
        Session.set("timeline-startDate",moment(Session.get("timeline-startDate")).subtract(1, "week").toDate());
    });

    /* scroll right */
    $('#timeline-btn-scroll-right').click(function(){
        Session.set("timeline-startDate",moment(Session.get("timeline-startDate")).add(1, "week").toDate());
    });

    // $('.timeline-project-list-item').draggable({ revert: true });
    // $('.timeline-project-bar').draggable({ revert: true });
    // $('.progress-bar').draggable({ revert: true });
};

Template.timelineHeader.helpers({
    /**
     * returns weeknumber + increment (for table header)
     *
     * @param  {Number} increment weeks to increment
     * @return {String} week number
     */
    getWeekNumber: function(increment) {
        var startDate = moment(Session.get("timeline-startDate"));
        return startDate.add(increment,"week").format("WW");
    }
});

Template.timelineRow.helpers({
    /**
     * returns project bars for employee at startweek + increment
     * @param  {EmployeeID} employeeID employeeID
     * @param  {Number} increment  timeline-startDate + increment
     * @return {[type]}            [description] TODO fill me
     */
    getProjectBars: function(increment) {
        var employeeID = Template.currentData()['_id'];
        var startDate = Session.get("timeline-startDate");
        var queryDate = moment(startDate).add(increment, "w").toDate();
        return employeeID + " - " + queryDate;
        //TODO query here for project bars!
    },
    getEmployeeLoad: function() {
        return 42; //TODO implement me
    }
});
