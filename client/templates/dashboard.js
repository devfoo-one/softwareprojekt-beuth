/*Template Manager for Dashboard*/

Template.dashboard.helpers({
    projects: function() {
        var _this = Meteor.user();
        return Projects.find( { creatorId: _this._id } );
    }
});

Template.dashboard.events({
    'submit #addNewProjectForm': function(e) {
        e.preventDefault();

        // collect the data for the new project from the dialog
        var newProject = {
            title: $(e.target).find('#titleInput').val(),
            color: $(e.target).find('#colorInput').val(),
            projectManager: $(e.target).find('#managerInput').val(),
            description: $(e.target).find('#descriptionInput').val()
        };

        // call a method on the server to insert the new project
        Meteor.call('createProject', newProject, function(error, id) {
            if(error) {
                // if an error occurs display why it happened
                return alert(error.reason);
            }

            // if there is no error close the dialog
            e.target.reset();
            $('#addNewProjectModal').modal('hide');
        });

    },

    'submit #EditProjectForm': function(e) {
        e.preventDefault();

        // collect the updated project information
        var project = {
            _id: $(e.target).find('#objectID').val(),
            title: $(e.target).find('#titleInput').val(),
            color: $(e.target).find('#colorInput').val(),
            projectManager: $(e.target).find('#managerInput').val(),
            description: $(e.target).find('#descriptionInput').val()
        };
        // call a method on the server to update the project
        Meteor.call('updateProject', project, function(error) {
            if (error) { return alert(error.reason); }
            Router.go('/');
        });
        $('#editProjectModal').modal('hide');
    },

    'click .cancelModalButton': function(e) {
        // cancel button was clicked, close the dialog
        $(e.target).closest('.modal').modal('hide');
    },

    'click #btn-AddNewProject': function(e) {
        createModal(Template.AddNewProjectModal, "#addNewProjectModal", Template.instance().lastNode);
    }
});
