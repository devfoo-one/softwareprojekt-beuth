if (Meteor.isClient) {
    Template.topNavigationbar.helpers({
        activeIfTemplateIs: function (template) {
            var currentRoute = Router.current();
            return currentRoute &&
            template === currentRoute.lookupTemplate() ? 'active' : '';
        }
    });
}

// configure the login template (from the accounts package) to route
// to homepage on logout
Template._loginButtons.events({
    'click #login-buttons-logout': function(ev) {
        Router.go('/');
    }
});
