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
                
       
       //creates an default object for the freedays
        var freeDaysObj = {
            monday      : false,
            tuesday     : false,
            wednesday   : false,
            thursday    : false,
            friday      : false
        };
        
        //each weekday which is checked, set on true in the freedaysobject 
        $('.freeDaysInput:checked').each(function(i){
            switch( $(this).val() ) {
                case "monday" :
                    freeDaysObj.monday = true;
                    break;
                case "tuesday" :
                    freeDaysObj.tuesday = true;
                    break;
                case "wednesday" :
                    freeDaysObj.wednesday = true;
                    break;
                case "thursday" :
                    freeDaysObj.thursday = true;
                    break; 
                case "friday" :
                    freeDaysObj.friday = true;
                    break;
            }
        });

        // collect information about the employee
        var newEmployee = {
            firstName: $(e.target).find('#firstNameInput').val(),
            lastName: $(e.target).find('#lastNameInput').val(),
            eMail: $(e.target).find('#eMailInput').val(),
            skills: skillsArray,
            freeDays : freeDaysObj,
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

        // parse the skills into an array
        var skillsInput = $(e.target).find('#skillsInput').val();
        var skillsArray = skillsInput.split(',');
        //remove whitespace arround skills
        skillsArray.forEach(function(element, index, array) {
            array[index] = element.trim();
        });
        
         //creates an default object for the freedays
        var freeDaysObj = {
            monday      : false,
            tuesday     : false,
            wednesday   : false,
            thursday    : false,
            friday      : false
        };
        
        //each weekday which is checked, set on true in the freedaysobject 
        $('.freeDaysInput:checked').each(function(i){
            switch( $(this).val() ) {
                case "monday" :
                    freeDaysObj.monday = true;
                    break;
                case "tuesday" :
                    freeDaysObj.tuesday = true;
                    break;
                case "wednesday" :
                    freeDaysObj.wednesday = true;
                    break;
                case "thursday" :
                    freeDaysObj.thursday = true;
                    break; 
                case "friday" :
                    freeDaysObj.friday = true;
                    break;
            }
        });
        
        // gather the employee information
        var employee = {
            _id: $(e.target).find('#objectID').val(),
            firstName: $(e.target).find('#firstNameInput').val(),
            lastName: $(e.target).find('#lastNameInput').val(),
            eMail: $(e.target).find('#eMailInput').val(),
            skills: skillsArray,
            freeDays : freeDaysObj,
            type: $(e.target).find('#contractTypeInput').val(),
            workTime: $(e.target).find('#workTimeInput').val()
        };
        
        // call a method on the server to update the employee
        Meteor.call('updateEmployee', employee, function(error) {
            if (error)
                return alert(error.reason);

            // reset the dialog
            $('#editEmployeeModal').modal('hide');
        });
    }
});
