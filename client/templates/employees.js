/*Template Manager for Employees*/

Template.employees.rendered = function(){
        $('#editEmployeeModal').on('hide.bs.modal', function (e) {
            /*
            clear session variable when dialog is hiding.
            i´m not really shure why this is neccessary,
            but leaving it set causes data display errors (empty fields...)
            */
            Session.set('employees.employeeToEdit', null);
        });
    };


Template.employees.helpers({
    employees: function() {
        return Employees.find();
    },
    editEmployee: function() {
        return Session.get('employees.employeeToEdit');
    }
});

Template.employees.events({
    'submit #addNewEmployeeForm': function(e) {
        e.preventDefault();

        // parse the skills into an array
        var skillsInput = $(e.target).find('#skillsInput').val();
        var skillsArray = skillsInput.split(',');
        //remove whitespace arround skills
        skillsArray.forEach(function(element, index, array) {
            array[index] = element.trim();
        });

        // collect information about the employee
        var newEmployee = {
            firstName: $(e.target).find('#firstNameInput').val(),
            lastName: $(e.target).find('#lastNameInput').val(),
            eMail: $(e.target).find('#eMailInput').val(),
            skills: skillsArray,
            type: $(e.target).find('#contractTypeInput').val(),
            workTime: $(e.target).find('#workTimeInput').val()
        };
    
        // call a method on the server to create the employee 
        Meteor.call('createEmployee', newEmployee, function(error) {
            if (error)
                return alert(error.reason);

            // reset the dialog
            e.target.reset();
            $('#addNewEmployeeModal').modal('hide');
        });

    },

    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    },

    'submit #editEmployeeForm': function(e) {
        e.preventDefault();
        
        var _id = $(e.target).find('#objectID').val();

        // parse the skills into an array
        var skillsInput = $(e.target).find('#skillsInput').val();
        var skillsArray = skillsInput.split(',');
        //remove whitespace arround skills
        skillsArray.forEach(function(element, index, array) {
            array[index] = element.trim();
        });
        
        var employee = {
            firstName: $(e.target).find('#firstNameInput').val(),
            lastName: $(e.target).find('#lastNameInput').val(),
            eMail: $(e.target).find('#eMailInput').val(),
            skills: skillsArray,
            type: $(e.target).find('#contractTypeInput').val(),
            workTime: $(e.target).find('#workTimeInput').val()
        };
        
        // call a method on the server to update the employee 
        Employees.update(
            { _id: _id },
            { $set: employee }
        );
        
        // reset the dialog
        $('#editEmployeeModal').modal('hide');
    }
});
