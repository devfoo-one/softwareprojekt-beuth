Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [
            Meteor.subscribe('projects'),
            Meteor.subscribe('employees'),
            Meteor.subscribe('engagements')
        ];
    }
});

Router.map(function(){
    this.route('dashboard', {path: '/'});
    this.route('employees', {path: '/employees'});
    this.route('employeeDetailView', {
        path: '/employeeDetailView/:_id',
        data: function() { return Employees.findOne(this.params._id); }
    });
    this.route('timeline', {
        path: '/timeline/'
    });
});

Router.onBeforeAction(function () {
    // render all pages only if a user is logged in
    if (!Meteor.user()) {
        // if the user is not logged in, check if he is currently trying to log in
        if (Meteor.loggingIn()) {
            // if he is, render the loading template
            this.render(this.loadingTemplate);
        } else {
            // if not render an error
            this.render('notLoggedInError');
        }
    } else {
        this.next();
    }
});
