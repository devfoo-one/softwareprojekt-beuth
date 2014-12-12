/*Template Manager for Employee Cards*/

Template.employeeCard.events = {
    'click .employeeDeleteButton': function(){
        var _this = this;
        var onOK = function() {
            // call a method on the server to delete this employee
            Meteor.call('deleteEmployee', _this._id, function(error) {
                if(error) {
                    // if an error occurs display why it happened
                    return alert(error.reason);
                }
            });
        }
        
        var buttonLabels = {
            ok: "Delete",
            cancel: "Cancel"
        };
        
        var warningHeader = "Delete employee '" + _this.firstName + " " + this.lastName + "' ?";
        var warningMessage = "Are you sure you want to delete the employee '" + _this.firstName + " " + this.lastName + "'? This cannot be undone!";
        
        showWarning(warningHeader, warningMessage, onOK, buttonLabels);
    },

    'click .employeeEditButton': function() {
        // set Session attribute that stores the selected employee
        Session.set('employees.employeeToEdit', this);
        // show modal
        $('#editEmployeeModal').modal('show');
    }
}
