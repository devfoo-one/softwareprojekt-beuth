/*
*   Template Manager for the Assign View of the Employee
*/

/* helper for finding project title by id */
Template.registerHelper("getProjectTitleById", function(projectId){
    if(projectId) {
        return Projects.findOne({_id: projectId}).title;
    }
});

/*helper for displaying all engagments*/
Template.employeeDetailView.helpers({
    engagements : function(){
        return Engagements.find({employeeId: this._id});
    }
});

/*helper to create the datetimepicker when the template is rendered*/
Template.engagementInput.rendered = function () {
    $(".engagementDatepicker").datetimepicker({
					pickTime: false
	});
}

Template.employeeDetailView.events({
    /*function to delete clicked engagement*/
    'click #engagementDeleteButton' : function(e){
        var thisId = this._id;
        var onOk = function () {
            Meteor.call('deleteEngagement', thisId, function(error) {
                    if(error) {
                        // if an error occurs display why it happened
                        return alert(error.reason);
                    }
            });
        };
        var buttonLabels = {
            ok: "Delete",
            cancel: "Cancel"
        };
        var warningHeader = "Delete Engagement ?";
        var projectTitle = Projects.findOne({_id: this.projectId}).title;
        var warningMessage = "Are you sure you want to delete the engagement '" + projectTitle + "'? This cannot be undone!";
        showWarning(warningHeader, warningMessage, onOk, buttonLabels);
    },

    /*function to add a new engagement*/
    'submit #addEngagementForm' : function(e){
        e.preventDefault();
        // collect information about engagement
        var _projectId = $(e.target).find('#projectNameSelect').val();

        //get right Date format
        var startDateString = Date.parse( $(e.target).find('#startDateInput').val() );
        var _startDate = new Date(startDateString);
        var _endDate =  parseInt( $(e.target).find('#endDateInput').val() );

        var newEngagement = {
            projectId: _projectId,
            employeeId: this._id,
            startDate: _startDate,
            endDate: _endDate
        };
        // call a method on the server to create the employee
        Meteor.call('createEngagement', newEngagement, function(error) {
            if (error)
                return alert(error.reason);

            // reset the dialog
            e.target.reset();
            $('#addEngagementModal').modal('hide');
        });
    },

    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }


});
