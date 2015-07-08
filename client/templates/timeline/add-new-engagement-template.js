Template.addNewEngagementModal.helpers({
    // project that got dragged onto timeline
    project2add: function() {
        return Projects.findOne({_id: Session.get("timeline.draggedProjectID")});
    },
    // employee the project got dragged onto
    employee2add: function() {
        return Employees.findOne({_id: Session.get("timeline.draggedEmployeeID")});
    },
    startDate : function() {
        return Session.get("timeline.draggedDate");
    },
    kw2add: function() {
        return moment(Session.get("timeline.draggedDate")).format("WW-YYYY");
    }
});

Template.addNewEngagementModal.events({
    'submit #addEngagementForm' : function(e) {
        e.preventDefault();
        var newEngagement = {
            projectId: $(e.target).find('#projectID').val(),
            employeeId: $(e.target).find('#employeeID').val(),
            startDate: moment($(e.target).find('#startWeek').val(), 'WW-YYYY').toDate(),
            groupStartDate: moment($(e.target).find('#startWeek').val(), 'WW-YYYY').toDate(),
            groupEndDate: moment($(e.target).find('#endWeek').val(), 'WW-YYYY').toDate(),
            duration: $(e.target).find('#durationInput').val()
        };
        var numEngagements = moment(newEngagement.groupEndDate).diff(moment(newEngagement.groupStartDate), 'weeks');
        for(var i=0; i<=numEngagements; i++) {
            newEngagement.startDate = moment(newEngagement.groupStartDate).add(i, 'weeks').toDate();
            Meteor.call('createEngagement', newEngagement, function(error, id) {
                if(error) {
                    return alert(error.reason);
                }
                Session.set("timeline.draggedProjectID", null);
                Session.set("timeline.draggedEmployeeID", null);
                Session.set("timeline.draggedDate", null);
                $('#addEngagementForm').modal('hide');
            });
        }
    }
});
