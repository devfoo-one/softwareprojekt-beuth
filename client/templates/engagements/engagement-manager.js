/*
*   Template Manager for the Assign View of the Employee
*/

/*helper for displaying all engagments*/
Template.employeeDetailView.helpers({
    engagements : function(){
        return Engagements.find();
    }
});

/*helper to create the datetimepicker when the template is rendered*/
Template.engagementInput.rendered = function () {
    $(".engagementDatepicker").datetimepicker({
					pickTime: false
	});
}


Template.employeeDetailView.events({
    'submit #addEngagementForm' : function(e){
        e.preventDefault();

        //check if a correct porject name is chosen
        var _projectName = $(e.target).find('#projectNameInput').val();
        var _projectId;
        try {
            _projectId = Projects.findOne({title: _projectName})._id;
        } catch(e){}

        
        // collect information about engagement
        
        
        var newEngagement = {
            projectId: _projectId,
            employeeId: this._id,
            projectName: _projectName,
            startDate: $(e.target).find('#startDateInput').val(),
            endDate: $(e.target).find('#endDateInput').val()
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
