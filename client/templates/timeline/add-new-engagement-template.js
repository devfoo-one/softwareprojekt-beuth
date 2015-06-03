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
        return moment(Session.get("timeline.draggedDate")).format("WW");
    }
});

Template.addNewEngagementModal.events({
    'submit #addEngagementForm' : function(e) {
        e.preventDefault();
        var newEngagement = {
            projectId: $(e.target).find('#projectID').val(),
            employeeId: $(e.target).find('#employeeID').val(),
            startDate: new Date(Date.parse($(e.target).find('#startDate').val())),
            duration: $(e.target).find('#durationInput').val()
        };
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
});
