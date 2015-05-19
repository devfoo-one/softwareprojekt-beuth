Meteor.publish('projects', function() {
    return Projects.find( { $or: [ { creatorId: this.userId } , { creatorId: null } ] } );
});

Meteor.publish('employees', function() {
    return Employees.find({creatorId: this.userId});
});

Meteor.publish('engagements', function() {
    return Engagements.find({creatorId: this.userId});
});


Meteor.users.allow({
    remove: function (userId, doc) {
        return doc._id === userId;
    }
});
