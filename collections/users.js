Meteor.methods({
// this method updates an user in the database
    updateCompanySettings: function(companySettingsAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to edit your company settings!");
            
        // pick only the attributes we need and put them in the profile object
        var companySettings = {
            profile: _.pick(companySettingsAttributes, 'companyName', 'companyLogo')
        };

        // append the company settings to the users collection
        Meteor.users.update(
            {_id: user._id},
            {$set: companySettings}
        ); 
    }
});
