Template.editEngagementModal.helpers({
    editEngagement: function() {
        return Session.get('timeline.engagementToEdit');
    }
});

Template.editEngagementModal.events({
    'submit #editEngagementForm' : function(e) {
        e.preventDefault();
        var updateEngagement = {
            _id: $(e.target).find('#engagementID').val(),
            projectId: $(e.target).find('#projectID').val(),
            employeeId: $(e.target).find('#employeeID').val(),
            startDate: new Date(Date.parse($(e.target).find('#startDate').val())),
            duration: $(e.target).find('#durationInput').val()
        };
        console.log(updateEngagement); //XXX
        Meteor.call('updateEngagement', updateEngagement, function(error, id) {
            if(error) {
                return alert(error.reason);
            }
            Session.set('timeline.engagementToEdit', null);
            $('#editEngagementModal').modal('hide');
        });
    },
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }
});
