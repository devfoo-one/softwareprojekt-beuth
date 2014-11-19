/*Template Manager for Project Cards*/
Template.projectCard.events = {
    'click .projectDeleteButton': function(){
        var _this = this;
        var onOK = function() {
            Projects.remove(_this._id);
        }
        var warningHeader = "Delete project '" + _this.title + "' ?";
        var warningMessage = "Are you sure you want to delete the project '" + _this.title + "'? This cannot be undone!";
        showWarning(warningHeader, warningMessage, onOK);
    }
}
