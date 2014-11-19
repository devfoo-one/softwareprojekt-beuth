/*Template Manager for Dashboard*/

Template.dashboard.helpers({
  projects: function() {
    return Projects.find();
  }
});
