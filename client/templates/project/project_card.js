/*Template Manager for Project Cards*/
Template.projectCard.events = {
    'click .projectDeleteButton': function(){
        Projects.remove(this._id);
    }
}
