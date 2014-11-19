/*Template Manager for Dashboard*/

Template.dashboard.helpers({
  projects: function() {
    return Projects.find();
  }
});

Template.dashboard.events({
    'submit form': function(e) {
        e.preventDefault();
        var newProject = {
            title: $(e.target).find('#titleInput').val(),
            projectManager: $(e.target).find('#managerInput').val(),
            description: $(e.target).find('#descriptionInput').val()
        };
        Projects.insert(newProject);
        e.target.reset();
        $('#addNewProjectModal').modal('hide');
    },
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }

});
