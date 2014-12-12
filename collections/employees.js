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
        var employee = _.pick(employeeAttributes, 'firstName', 'lastName', 'eMail', 'skills', 'type', 'workTime');
        
        employee = _.extend(employee, {
            creatorId: user._id
        });
        
        // write the employee to the database
        var employeeId = Employees.insert(employee);
        
        return employeeId;
    }
});
