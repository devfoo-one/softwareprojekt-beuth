// if the projects collection is empty, provide some default data
if (Projects.find().count() === 0) {
    Projects.insert({
        title: 'Sort Socks',
        projectManager: 'Hans Wurst',
        description: 'Sort all the socks alphabetically and by colour.'
    });

    Projects.insert({
        title: 'Rule the world',
        projectManager: 'Klaus Kleber',
        description: 'Obvious, duh!'
    });

    Projects.insert({
        title: 'Eat all the red gummibears',
        projectManager: 'Gundula Gause',
        description: 'JUST EAT THEM ALL!!!'
    });
}

// if the employees collection is empty, provide some default data
if (Employees.find().count() === 0) {
    Employees.insert({
        managerID: null, // id of user that is able to manage this Employees
        firstName: 'Bender',
        lastName: 'Rodriguez',
        eMail: 'benderrodriguez@devfoo.de',
        skills: ['drinking','bending'],
        type: 'contract',
        workTime: 100
    });

    Employees.insert({
        managerID: null,
        firstName: 'Hubert',
        lastName: 'Farnsworth',
        eMail: 'hubertfarnsworth@devfoo.de',
        skills: ['science','sleeping'],
        type: 'freelance',
        workTime: 50
    });
}
