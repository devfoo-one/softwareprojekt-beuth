
//TODO images preview before upload + display the company logo if there is already saved one
/* Template.companyInput.helpers({
    previewLogo: function(){
    
       
            var oFReader = new FileReader();
            document.getElementById("companyLogoInput").onChange = function(){
                oFReader.readAsDataURL(document.getElementById("companyLogoInput").files[0]);
            }
            var src;
            oFReader.onload = function (oFREvent) {
               src = oFREvent.target.result;
            };
        return src;       
    }
    
});*/


Template.companyDetails.events = {
    'click #companyDetailsLink' : function() {
        var data = Meteor.user().profile;
        console.log(data);
        // render Template into "Edit Employee" Modal Dialog
        Blaze.renderWithData(Template.companyInput, data, $("#companyDetailsInsert").get(0));
    }
}

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
        }
        e.target.reset();
        $('#companyDetailsInsert').empty();
        $('#setCompanyDetails').modal('hide');
    },
    
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }

});
