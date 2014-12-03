Template.deleteAccount.events = {
    'click': function(){
        var _this = Meteor.user();
        var onOK = function() {
            console.log(_this);
            //console.log(Employees);
            //.remove(_this._id);
            Meteor.users.remove(_this._id);

        }
        var buttonLabels = {
            ok: "Delete",
            cancel: "Cancel"
        };
        var warningHeader = "Delete account?";
        var warningMessage = "Are you sure you want to delete your account? This cannot be undone!";
        showWarning(warningHeader, warningMessage, onOK, buttonLabels);
    }
}
