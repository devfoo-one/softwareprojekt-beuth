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
            var demoProject1 = Projects.insert({
                title: 'Sort Socks',
                projectManager: 'Hans Wurst',
                description: 'Sort all the socks alphabetically and by colour.',
                creatorId: testUserId
            });

            var demoProject2 = Projects.insert({
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

            Projects.insert({
                title:'Vacation',
                creatorId: null
            });

            // provide some default data for the employees collection
            var demoEmployee1 = Employees.insert({
                firstName: 'Bender',
                lastName: 'Rodriguez',
                eMail: 'benderrodriguez@devfoo.de',
                skills: ['drinking','bending'],
                type: 'contract',
                workTime: 36,
                freeDays: {"monday" : false, "tuesday" : false, "wednesday" : false, "thursday" : false, "friday" : false },
                creatorId: testUserId
            });

            var demoEmployee2 = Employees.insert({
                firstName: 'Hubert',
                lastName: 'Farnsworth',
                eMail: 'hubertfarnsworth@devfoo.de',
                skills: ['science','sleeping'],
                type: 'freelance',
                workTime: 42,
                freeDays: {"monday" : false, "tuesday" : false, "wednesday" : false, "thursday" : false, "friday" : false },
                creatorId: testUserId
            });

            // if the engagements collection is empty, provide some default data
            Engagements.insert({
                projectId: demoProject1,
                employeeId: demoEmployee1,
                creatorId: testUserId,
                startDate: new Date(2015, 05, 01),
                duration: 8
            });

            Engagements.insert({
                projectId: demoProject2,
                employeeId: demoEmployee1,
                creatorId: testUserId,
                startDate: new Date(2015, 05, 01),
                duration: 8
            });

            Engagements.insert({
                projectId: demoProject1,
                employeeId: demoEmployee1,
                creatorId: testUserId,
                startDate: new Date(2015, 05, 8),
                duration: 8
            });

            Engagements.insert({
                projectId: demoProject2,
                employeeId: demoEmployee2,
                creatorId: testUserId,
                startDate: new Date(2015, 05, 28),
                duration: 20
            });
        }
    });
}
