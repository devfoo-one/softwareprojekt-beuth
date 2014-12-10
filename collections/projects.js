Projects = new Mongo.Collection('projects');

Meteor.methods({
    // this method insert a new project into the database
    createProject: function(projectAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to create new projects!");
            
        // ensure the project has a title
        if (!projectAttributes.title)
            throw new Meteor.Error(422, "Please fill in a title!");
        
        // create the project database entry
        var project = {
            title: projectAttributes.title,
            projectManager: projectAttributes.projectManager,
            description: projectAttributes.description,
            creatorId: user._id
        };
        
        // write the project to the database
        var projectId = Projects.insert(project);
        
        return projectId;
    }
});
