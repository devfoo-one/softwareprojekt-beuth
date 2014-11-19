Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('projects'); }
});

Router.map(function(){
    this.route('dashboard', {path: '/'});

    this.route('editProjectPage', {
        path: '/editProject/:_id',
        data: function() { return Projects.findOne(this.params._id); }
    });
});

Router.onBeforeAction('loading');
