Meteor.publish('projects', function() {
    return Projects.find({creatorId: this.userId}) ;
});

Meteor.publish('employees', function() {
    return Employees.find({creatorId: this.userId});
});

Meteor.publish('engagements', function() {
    return Engagements.find();
});


Meteor.users.allow({
    remove: function (userId, doc) {
        return doc._id === userId;
    }
});
