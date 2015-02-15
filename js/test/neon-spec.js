import {Neon} from '../es6/neon'
var assert = require('assert');
require('./sinon-cleanup');

describe('something', () => {

  it('that should work', () => {
    assert.equal(new Neon().sayHi(), 'Hi neon 7 Anonymous!');
  });

  it('should have called', function() {
    let neon = new Neon();
    let stub = this.sinon.stub(neon, 'value');
    stub.returns(42);

    assert.equal(neon.value(), 42);
  });
  
});