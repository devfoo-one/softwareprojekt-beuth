Meteor.publish('projects', function() {
    return Projects.find() ;
});

Meteor.publish('employees', function() {
    return Employees.find();
});
