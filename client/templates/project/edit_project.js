/* events for the editProjectPage template */
Template.editProjectPage.events({
    'submit form': function(e) {
        e.preventDefault();

        // collect the updated project information
        var project = {
            _id: this._id,
            title: $(e.target).find('#titleInput').val(),
            projectManager: $(e.target).find('#managerInput').val(),
            description: $(e.target).find('#descriptionInput').val()
        }
         
        // call a method on the server to update the project 
        Meteor.call('updateProject', project, function(error) {
            if (error)
                return alert(error.reason);
            
            Router.go('/');
        });
    }
});
