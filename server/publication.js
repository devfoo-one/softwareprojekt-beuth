Meteor.publish('projects', function() {
    return Projects.find() ;
});

Meteor.publish('employees', function() {
    return Employees.find();
});


Meteor.users.allow({
    remove: function (userId, doc) {
        return doc._id === userId;
    }
});