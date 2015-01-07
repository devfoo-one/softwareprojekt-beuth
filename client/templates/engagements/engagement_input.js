Template.engagementInput.helpers({
    engagements : function(){
        return Engagements.find({employeeId: this._id});
    },
    projects : function(){
        return Projects.find();
    }
});
