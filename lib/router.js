Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('projects'); }
});

Router.map(function(){
    this.route('dashboard',{path: '/'});
})

Router.onBeforeAction('loading');
