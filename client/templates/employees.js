/*Template Manager for Employees*/

Template.employees.helpers({
  employees: function() {
    return Employees.find();
  }
});

Template.employees.events({
    'submit form': function(e) {
        e.preventDefault();

        skillsInput = $(e.target).find('#skillsInput').val();
        skillsArray = skillsInput.split(',');
        //remove whitespace arround skills
        skillsArray.forEach(function(element, index, array) {
            array[index] = element.trim();
        });

        var newEmployee = {
            managerID: Meteor.user()._id,
            firstName: $(e.target).find('#firstNameInput').val(),
            lastName: $(e.target).find('#lastNameInput').val(),
            eMail: $(e.target).find('#eMailInput').val(),
            skills: skillsArray,
            type: $(e.target).find('#contractTypeInput').val(),
            workTime: $(e.target).find('#workTimeInput').val()
        };
        Employees.insert(newEmployee);
        e.target.reset();
        $('#addNewEmployeeModal').modal('hide');
    },
    'click .cancelModalButton': function(e) {
        $(e.target).closest('.modal').modal('hide');
    }

});
