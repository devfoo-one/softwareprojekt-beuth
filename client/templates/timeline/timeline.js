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
        engagements.push({
            "startDate": engagement.startDate,
            "endDate": engagement.endDate,
            "taskName": employee.lastName,
            "status": "PROJECT"
        });
    });

    // colors set in /stylesheets/timeline.css
    var taskStatus = {
        "PROJECT" : "bar-project",
        "FREETIME" : "bar-freetime"
    };

    // set x axis ticks to weeknumber
    var format = "%U";

    // margin of gantt chart within container (axis description NOT included)
    var margin = {
        top : 20,
        right : 20,
        bottom : 20,
        left : 100
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
    console.log(gantt);
};
