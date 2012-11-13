describe('auto', function () {
  it('can run a concurrent set of dependant tasks', function (done) {
    var spy1 = chai.spy('one', function (next) {
          setTimeout(function () {
            spy2.should.have.been.called.once;
            spy3.should.have.not.been.called();
            next();
          }, 10);
        })
      , spy2 = chai.spy('two', function (next) {
          setTimeout(function () {
            spy1.should.have.been.called.once;
            spy3.should.have.not.been.called();
            next();
          }, 10);
        })
      , spy3 = chai.spy('three', function (next) {
          setTimeout(function () {
            spy1.should.have.been.called.once;
            spy2.should.have.been.called.once;
            next();
          }, 10);
        });

    auto({
        one: spy1
      , two: spy2
      , three: [ 'one', 'two', spy3 ]
    }, function (err) {
      should.not.exist(err);
      spy1.should.have.been.called.once;
      spy2.should.have.been.called.once;
      spy3.should.have.been.called.once;
      done();
    });
  });
});
