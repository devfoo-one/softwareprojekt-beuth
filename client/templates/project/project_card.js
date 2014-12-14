/*Template Manager for Project Cards*/
Template.projectCard.events = {
    'click .projectDeleteButton': function() {
        var _this = this;
        var onOK = function() {
            // call a method on the server to delete this project
            Meteor.call('deleteProject', _this._id, function(error) {
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
        
        var warningHeader = "Delete project '" + _this.title + "' ?";
        var warningMessage = "Are you sure you want to delete the project '" + _this.title + "'? This cannot be undone!";
        
        showWarning(warningHeader, warningMessage, onOK, buttonLabels);
    }
}
