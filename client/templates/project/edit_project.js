/* events for the editProjectPage template */
Template.editProjectPage.events({
    'submit form': function(e) {
         e.preventDefault();

         var project = {
             title: $(e.target).find('#titleInput').val(),
             projectManager: $(e.target).find('#managerInput').val(),
             description: $(e.target).find('#descriptionInput').val()
         }
         
         Projects.update(
             { _id: this._id },
             { $set: project },
             { multi: true }
         );

         Router.go('/');
     }
});
