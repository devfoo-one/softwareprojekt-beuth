/*Template Manager for Employee Cards*/

Template.employeeCard.events = {
    'click .employeeDeleteButton': function(){
        var _this = this;
        var onOK = function() {
            Employees.remove(_this._id);
        }
        var buttonLabels = {
            ok: "Delete",
            cancel: "Cancel"
        };
        var warningHeader = "Delete employee '" + _this.firstName + " " + this.lastName + "' ?";
        var warningMessage = "Are you sure you want to delete the employee '" + _this.firstName + " " + this.lastName + "'? This cannot be undone!";
        showWarning(warningHeader, warningMessage, onOK, buttonLabels);
    }
}
