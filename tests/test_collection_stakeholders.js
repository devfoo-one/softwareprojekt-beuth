// tests collection 'Stakeholders'

var assert = require('assert');

suite('Stakeholders', function() {
    test('insert new stakeholder', function(done, server) {
        server.eval(function() {
            Stakeholders.insert({
                managerID: null,
                firstName: 'Test',
                lastName: 'Test',
                eMail: 'test@devfoo.de',
                skills: ['testing','failing'],
                type: 'contract',
                workTime: 100
            });
            var docs = Stakeholders.find().fetch();
            emit('docs', docs);
        });
        
        server.once('docs', function(docs) {
            assert.equal(docs.length, 3); //3 due to the fixtures set in /server/fixtures.js
            done();
        });
    });
});
