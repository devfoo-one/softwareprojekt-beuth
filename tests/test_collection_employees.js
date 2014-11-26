// tests collection 'Employees'

var assert = require('assert');

suite('Employees', function() {
    test('insert new employee', function(done, server) {
        server.eval(function() {
            Employees.insert({
                managerID: null,
                firstName: 'Test',
                lastName: 'Test',
                eMail: 'test@devfoo.de',
                skills: ['testing','failing'],
                type: 'contract',
                workTime: 100
            });
            var docs = Employees.find().fetch();
            emit('docs', docs);
        });
        
        server.once('docs', function(docs) {
            assert.equal(docs.length, 3); //3 due to the fixtures set in /server/fixtures.js
            done();
        });
    });
});
