/*Template Manager for Dashboard and Project Cards*/

Template.dashboard.helpers({
    projects: function() {
        return Projects.find();
    }
});
