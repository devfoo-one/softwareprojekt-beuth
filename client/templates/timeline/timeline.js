Template.timeline.helpers

Template.timeline.rendered = function(){

    // get employees for y axis
    var employeeNames = [];
    Employees.find().forEach(function(employee){
        employeeNames.push(employee.lastName);
    });

    // get engagements
    var engagements = [];
    Engagements.find().forEach(function(engagement){
        var employee = Employees.findOne({_id: engagement.employeeId});
        var engagement = {
            "startDate": engagement.startDate,
            "endDate": engagement.endDate,
            "taskName": employee.lastName,
            "status": "RUNNING"
        };
        engagements.push(engagement);
    });

    var taskStatus = {
        "SUCCEEDED" : "bar",
        "FAILED" : "bar-failed",
        "RUNNING" : "bar-running",
        "KILLED" : "bar-killed"
    };

    // set x axis ticks to weeknumber
    var format = "%U";

    var margin = {
        top : 20,
        right : 20,
        bottom : 20,
        left : 20
    };

    var gantt =
        d3.gantt()
        .taskTypes(employeeNames)
        .taskStatus(taskStatus)
        .tickFormat(format)
        .margin(margin)
        .timeDomainMode("fixed");

    gantt.timeDomain([Date.now(), d3.time.week.offset(Date.now(),12)]);
    gantt(engagements);
};
