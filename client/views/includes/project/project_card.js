//TODO hier projekt daten aus mongo holen die angezeigt werden sollen im project dashboard
//collection o.ä.
var projectData = ;

//TODO vikis namen checken!!!
//TODO evtl. alle expressions aus der html durch eine function befüllen lassen.
Template.projectList.helpers({
    projects: function() {
        return Projects.find();
    }
});
