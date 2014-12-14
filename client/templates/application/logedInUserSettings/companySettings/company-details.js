/*
 *  This .js File implements the event handling of the company details settings, which includes to insert the company name and show
 *  it, if the dialog is opened again, and to save the company logo on the server and preview it.
*/

Template.companyDetails.events = {
    'click #companyDetailsLink' : function() {
        var data = Meteor.user().profile;
        // render Template into "Edit Employee" Modal Dialog
        Blaze.renderWithData(Template.companyInput, data, $("#companyDetailsInsert").get(0));
        
    }
}

Template.companyInput.events = {  
    'change #companyLogoInput' : function(ev, template){
        var image = document.getElementById('companyLogoInput').files[0];
        var reader = new FileReader();
        
        reader.onload = function(e){
            document.getElementById("companyLogoPreview").src = reader.result;        
        };    
        reader.readAsDataURL(image);
    }
}

Template.settingsDialog.events({
    'submit form': function(e, template) {
        e.preventDefault();
        
        // collect information about the company
        var companySettings = {
            companyName: $(e.target).find('#companyNameInput').val(),
            companyLogo: document.getElementById("companyLogoPreview").src
        };          
   
        // call a method on the server to update the company settings
        Meteor.call('updateCompanySettings', companySettings, function(error) {
            if (error)
                return alert(error.reason);

            //clean dialog
            e.target.reset();
            $('#companyDetailsInsert').empty();
            $('#setCompanyDetails').modal('hide');
        });
    },
    
    'click .cancelModalButton': function(e) {
        $('#companyDetailsInsert').empty();
        $(e.target).closest('.modal').modal('hide');
    },
    
    'click #closeXBtn' : function(e){
        $('#companyDetailsInsert').empty();
    }

});
