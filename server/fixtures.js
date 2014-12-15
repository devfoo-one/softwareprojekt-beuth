// if the server starts, create a default test user, if it doesn't already exist
if (Meteor.isServer) {
    Meteor.startup(function () {
        // test user data
        var options = {
            username: "tester",
            email: "staffingdashboard-tester@devfoo.de",
            password: "tester"
        };

        // check if the test user exists
        var testUserCount = Meteor.users.find( {
            username: options.username,
            emails: { $elemMatch: { address: options.email} }
        } ).count();

        // create the test user if it doesn't exist
        if (testUserCount === 0) {
            var testUserId = Accounts.createUser(options);

            // provide some default data for the projects collection
            Projects.insert({
                title: 'Sort Socks',
                projectManager: 'Hans Wurst',
                description: 'Sort all the socks alphabetically and by colour.',
                creatorId: testUserId
            });

            Projects.insert({
                title: 'Rule the world',
                projectManager: 'Klaus Kleber',
                description: 'Obvious, duh!',
                creatorId: testUserId
            });

            Projects.insert({
                title: 'Eat all the red gummibears',
                projectManager: 'Gundula Gause',
                description: 'JUST EAT THEM ALL!!!',
                creatorId: testUserId
            });

            // provide some default data for the employees collection
            Employees.insert({
                firstName: 'Bender',
                lastName: 'Rodriguez',
                eMail: 'benderrodriguez@devfoo.de',
                skills: ['drinking','bending'],
                type: 'contract',
                workTime: 100,
                creatorId: testUserId
            });

            Employees.insert({
                firstName: 'Hubert',
                lastName: 'Farnsworth',
                eMail: 'hubertfarnsworth@devfoo.de',
                skills: ['science','sleeping'],
                type: 'freelance',
                workTime: 50,
                creatorId: testUserId
            });

            // provide some default data for the engagements collection
            Engagements.insert({
                projectID: null,
                employeeID: null,
                startDate: new Date(14,06,15),
                endDate: new Date(14,07,15)
            });

            Engagements.insert({
                employeeID: null,
                projectID: null,
                startDate: new Date(28,06,15),
                endDate: new Date(28,07,15)
            });
        }
    });
}
