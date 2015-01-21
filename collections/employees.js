Employees = new Mongo.Collection('employees');

Meteor.methods({
    // this method inserts a new employee into the database
    createEmployee: function(employeeAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to create new employees!");
            
        // ensure the employee has a name
        if (!employeeAttributes.firstName || !employeeAttributes.lastName)
            throw new Meteor.Error(422, "Please fill in a first and last name!");
        
        // create the employee database entry
        var employee = _.pick(employeeAttributes, 'firstName', 'lastName', 'eMail', 'skills', 'freeDays', 'type', 'workTime');
        
        employee = _.extend(employee, {
            creatorId: user._id
        });
        
        // write the employee to the database
        var employeeId = Employees.insert(employee);
        
        return employeeId;
    },    
    
    
    // this method deletes an employee from the database
    deleteEmployee: function(employeeId) {
        var user = Meteor.user();

        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to delete employees!");
            
        /** TODO: Maybe check if the user is the creator of the employee. */
        
        Employees.remove(employeeId);
    },


    // this method updates an employee in the database
    updateEmployee: function(employeeAttributes) {
        var user = Meteor.user();
        
        // ensure that the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to be logged in to edit an employee!");
        
        // make sure the client passed us an Id
        if (!employeeAttributes._id)
            throw new Meteor.Error(422, "Client passed invalid data. (Id is missing)");
            
        /** TODO: Make sure the user is the creator of the employee he is trying to delete. */
            
        // pick only the attributes we need and create a employee database entry
        var employee = _.pick(employeeAttributes, 'firstName', 'lastName', 'eMail', 'skills', 'freeDays', 'type', 'workTime');
        
        Employees.update(
            { _id: employeeAttributes._id }, // query
            { $set: employee }
        );
    }
});
