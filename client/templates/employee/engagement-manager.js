/*
*   Template Manager for the Assign View of the Employee
*/

Template.employeeDetailView.helpers({
    engagements : function(){
        return Engagements.find();
    }
});

Template.employeeDetailView.events({
    'click #newAssignmentButton' : function(e){
        
    },
    
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }
});
