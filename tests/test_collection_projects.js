// tests collection 'Projects'

var assert = require('assert');

suite('Projects', function() {
  test('insert new project', function(done, server) {
    server.eval(function() {
      Projects.insert({
          title: 'testtitle',
          description: 'testdescription'
      });
      var docs = Projects.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
      assert.equal(docs.length, 4); //4 due to the fixtures set in /server/fixtures.js
      done();
    });
  });
});
