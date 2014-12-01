/*Templates.companyInput.helpers({

    $("#logoPreview").val() = Meteor.user().profile.companyLogo;
});*/

Template.settingsDialog.events({
    'submit form': function(e, template) {
        e.preventDefault();
        var companyName = $(e.target).find('#companyNameInput').val();
        var companyLogo = template.find('#companyLogoInput').files[0];
        var reader = new FileReader();
        Meteor.users.update(
            {_id:Meteor.user()._id},
            {$set:{"profile.companyName": companyName}}
        );
        reader.onload = function(e){
            Meteor.users.update(
                {_id:Meteor.user()._id},
                {$set:{"profile.companyLogo": companyLogo}}
            );
            $(e.target).find('img').attr('src', e.target.result);
        }
        reader.readAsDataURL(companyLogo);
        e.target.reset();
        $('#setCompanyDetails').modal('hide');
    },
    
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }

});
