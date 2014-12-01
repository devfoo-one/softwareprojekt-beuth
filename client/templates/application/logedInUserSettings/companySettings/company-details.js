Template.settingsDialog.events({
    'submit form': function(e) {
        e.preventDefault();
        var companyName = $(e.target).find('#companyNameInput').val();
        var companyLogo = $(e.target).find('#companyLogoInput').val();
        Meteor.users.update(
            {_id:Meteor.user()._id},
            {$set:{"profile.companyName": companyName}},
            {$set:{"profile.companyLogo": companyLogo}}
        );
        Meteor.users.update(
            {_id:Meteor.user()._id},
            {$set:{"profile.companyLogo": companyLogo}}
        );
        e.target.reset();
        $('#setCompanyDetails').modal('hide');
    },
    
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }

});
