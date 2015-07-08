Template.editEngagementModal.helpers({
    editEngagement: function() {
        return Session.get('timeline.engagementToEdit');
    }
});

Template.editEngagementModalInner.helpers({
    groupStartDateKWFormat: function() {
        return moment(Session.get("timeline.engagementToEdit").groupStartDate).format("WW-YYYY");
    },
    groupEndDateKWFormat: function() {
        return moment(Session.get("timeline.engagementToEdit").groupEndDate).format("WW-YYYY");
    }
});

Template.editEngagementModal.events({

    'submit #editSingleEngagementForm' : function(e) {
        e.preventDefault();
        var updateEngagement = {
            _id: $(e.target).find('#singleEngagementID').val(),
            projectId: $(e.target).find('#singleProjectID').val(),
            employeeId: $(e.target).find('#singleEmployeeID').val(),
            startDate: new Date(Date.parse($(e.target).find('#singleStartDate').val())),
            duration: $(e.target).find('#singleDurationInput').val()
        };
        Meteor.call('updateEngagement', updateEngagement, function(error, id) {
            if(error) {
                return alert(error.reason);
            }
            Session.set('timeline.engagementToEdit', null);
            $('#editEngagementModal').modal('hide');
        });
    },

    'submit #editWholeEngagementForm' : function(e) {
        e.preventDefault();
        var engagementId = $(e.target).find('#groupEngagementID').val();
        var newGroupStartDate = moment($(e.target).find('#startWeek').val(), 'WW-YYYY').toDate();
        var newGroupEndDate = moment($(e.target).find('#endWeek').val(), 'WW-YYYY').toDate();

        // get one engagement out of group and read groupStartDate, groupEndDate and duration
        var engagement = Engagements.findOne({
            _id: engagementId
        });
        var oldGroupStartDate = engagement.groupStartDate;
        var oldGroupEndDate = engagement.groupEndDate;
        var duration = engagement.duration;
        var updateEngagement = {
            projectId: engagement.projectId,
            employeeId: engagement.employeeId,
            duration: engagement.duration,
            groupStartDate: newGroupStartDate,
            groupEndDate: newGroupEndDate
        };

        // if date-range got larger, create new engagements before and after the old ones
        var numEngagementsBefore = moment(oldGroupStartDate).diff(moment(newGroupStartDate), 'weeks');
        for(var i=0; i<numEngagementsBefore; i++) {
            updateEngagement.startDate = moment(newGroupStartDate).add(i, 'weeks').toDate();
            Meteor.call('createEngagement', updateEngagement, function(error, id) {
                if(error) {
                    return alert(error.reason);
                }
            });
        }
        var numEngagementsAfter = moment(newGroupEndDate).diff(moment(oldGroupEndDate), 'weeks');
        for(var j=1; j<=numEngagementsAfter; j++) {
            updateEngagement.startDate = moment(oldGroupEndDate).add(j, 'weeks').toDate();
            Meteor.call('createEngagement', updateEngagement, function(error, id) {
                if(error) {
                    return alert(error.reason);
                }
            });
        }

        // delete all engagements which are before newGroupStartDate or after newGroupEndDate
        Engagements.find({
            employeeId: updateEngagement.employeeId,
            projectId: updateEngagement.projectId,
            $or: [{startDate: {$lt: newGroupStartDate}},{startDate: {$gt: newGroupEndDate}}]
        }).forEach(function(element) {
            Meteor.call('deleteEngagement', element._id);
        });

        //update engagements with new groupStartDate and new groupEndDate
        Engagements.find({
            employeeId: updateEngagement.employeeId,
            projectId: updateEngagement.projectId,
            groupStartDate: oldGroupStartDate,
            groupEndDate: oldGroupEndDate,
        }).forEach(function(element) {
            element.groupStartDate = newGroupStartDate;
            element.groupEndDate = newGroupEndDate;
            Meteor.call('updateEngagement', element);
        });
        Session.set('timeline.engagementToEdit', null);
        $('#editEngagementModal').modal('hide');
    },

    'click .deleteWholeEngagementButton': function(e) {
        var engagementId = $(e.target).closest("form").find('#groupEngagementID').val();
        var engagement = Engagements.findOne({
            _id: engagementId
        });
        var engagements2delete = Engagements.find({
            employeeId: engagement.employeeId,
            projectId: engagement.projectId,
            groupStartDate: engagement.groupStartDate,
            groupEndDate: engagement.groupEndDate
        });
        var onOK = function() {
            engagements2delete.forEach(function(element) {
                Meteor.call('deleteEngagement', element._id);
            });
            $('#editEngagementModal').modal('hide');
        };
        var buttonLabels = {
            ok: "Delete all",
            cancel: "Cancel"
        };
        var warningHeader = "Delete all engagements of this group?";
        var warningMessage = "Are you sure you want to delete all engagements of this group?";
        showWarning(warningHeader, warningMessage, onOK, buttonLabels);
    },
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }
});
