Projects = new Mongo.Collection('projects');

Meteor.methods({
    // this method inserts a new project into the database
    createProject: function(projectAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to create new projects!");
            
        // ensure the project has a title
        if (!projectAttributes.title)
            throw new Meteor.Error(422, "Please fill in a title!");
        
        // create the project database entry
        var project = _.pick(projectAttributes, 'title', 'projectManager', 'description');
        
        project = _.extend(project, {
            creatorId: user._id
        });
        
        // write the project to the database
        var projectId = Projects.insert(project);
        
        return projectId;
    },


    // this method deletes a project from the database
    deleteProject: function(projectId) {
        var user = Meteor.user();

        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to delete projects!");
            
        /** TODO: Maybe check if the user is the creator of the project. */
        
        Projects.remove(projectId);
    },


    // this method updates a project in the database
    updateProject: function(projectAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to edit a project!");
        
        // make sure the client passed us an Id
        if (!projectAttributes._id)
            throw new Meteor.Error(422, "Client passed invalid data. (Id is missing)");
            
        /** TODO: Make sure the user is the creator of the project he is trying to delete. */
            
        // pick only the attributes we need and create a project database entry
        var project = _.pick(projectAttributes, 'title', 'projectManager', 'description');
        
        Projects.update(
            { _id: projectAttributes._id }, // query
            { $set: project }
        );
    }
});

