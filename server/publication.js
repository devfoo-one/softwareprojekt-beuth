Meteor.publish('projects', function() {
    return Projects.find() ;
});

Meteor.publish('stakeholders', function() {
    return Stakeholders.find();
});
