/*
* This Collection includes the engagements between employees and projects. 
*/

Engagements = new Mongo.Collection('engagements');

//TODO methods anpassen creatorId etc.
Meteor.methods({
    // this method inserts a new Engagement into the database
    createEngagement: function(engagementAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to create new engagement!");
            
        // ensure the engagement has a name
        if (!engagementAttributes.projectName || !engagementAttributes.projectId)
            throw new Meteor.Error(422, "Please fill in a correct Project Name!");
        
        // create the engagement database entry
        var engagement = _.pick(engagementAttributes,'projectId', 'employeeId' ,'projectName', 'startDate', 'endDate');
        
        engagement = _.extend(engagement, {
            creatorId: user._id
        });
        
        // write the employee to the database
        var engagementId = Engagements.insert(engagement);
        
        return engagementId;
    },    
    
    
    // this method deletes an engagement from the database
    deleteEngagement: function(engagementId) {
        var user = Meteor.user();

        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to delete engagements!");
            
        /** TODO: Maybe check if the user is the creator of the engagement. */
        
        Engagements.remove(engagementId);
    },


    // this method updates an employee in the database
    updateEngagement: function(engagementAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to edit an engagement!");
        
        // make sure the client passed us an Id
        if (!engagementAttributes._id)
            throw new Meteor.Error(422, "Client passed invalid data. (Id is missing)");
            
        /** TODO: Make sure the user is the creator of the employee he is trying to delete. */
            
        // pick only the attributes we need and create a engagement database entry
        var engagement = _.pick(engagementAttributes, 'projectId', 'employeeId', 'projectName', 'startDate', 'endDate');
        
        Employees.update(
            { _id: engagementAttributes._id }, // query
            { $set: engagement }
        );
    }
});
