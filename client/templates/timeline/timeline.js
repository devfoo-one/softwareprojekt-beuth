Template.timeline.rendered = function(){

    // create demo objects
    var tasks = [
        {
            "startDate":Date.now(),
            "endDate":d3.time.week.offset(Date.now(),2),
            "taskName":"HUBERT",
            "status":"RUNNING"
        },
        {
        "startDate":d3.time.week.offset(Date.now(),3),
        "endDate":d3.time.week.offset(Date.now(),5),
        "taskName":"HUBERT",
        "status":"RUNNING"
        }
    ];

    var taskStatus = {
        "SUCCEEDED" : "bar",
        "FAILED" : "bar-failed",
        "RUNNING" : "bar-running",
        "KILLED" : "bar-killed"
    };

    var taskNames = [ "HUBERT", "P Job", "E Job", "A Job", "N Job" ];

    var format = "%U";

    var margin = {
        top : 20,
        right : 20,
        bottom : 20,
        left : 20
    };

    var gantt =
        d3.gantt()
        .taskTypes(taskNames)
        .taskStatus(taskStatus)
        .tickFormat(format)
        .margin(margin)
        .timeDomainMode("fixed");
    
    gantt.timeDomain([Date.now(), d3.time.week.offset(Date.now(),12)]);
    gantt(tasks);
};
