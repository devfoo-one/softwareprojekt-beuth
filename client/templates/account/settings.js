Template.settings.helpers({
    settings : function(){
       var loginUser = Meteor.user();
       if(loginUser){
          $("#settingsMenu").show();
       }
    }
});
