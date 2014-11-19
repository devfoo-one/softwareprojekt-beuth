Template.projectCard.events = {
    'click #delete': function(){
        Projects.remove(this._id);
    }
}
