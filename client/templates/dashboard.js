/*Template Manager for Dashboard*/

Template.dashboard.helpers({
  projects: function() {
    return Projects.find();
  }
});

Template.dashboard.events({
    'submit form': function(e) {
        e.preventDefault();

        // collect the data for the new project from the dialog
        var newProject = {
            title: $(e.target).find('#titleInput').val(),
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

    'click .cancelModalButton': function(e) {
        // cancel button was clicked, close the dialog
        $(e.target).closest('.modal').modal('hide');
    },

    'click #btn-AddNewProject': function(e) {
        // render "addNewProjectModal" into the lastNode of current "dashboard"-template instance
        var modal = Blaze.render(Template.addNewProjectModal, Template.instance().lastNode);

        // destroy rendered template when modal is hiding
        $('#addNewProjectModal').on('hide.bs.modal', function (e) {
            Blaze.remove(modal);
        });

        // show modal
        $("#addNewProjectModal").modal('show');
    }
});
