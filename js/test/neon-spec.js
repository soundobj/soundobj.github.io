import {Neon} from '../es6/neon'
var assert = require('assert');
require('./sinon-cleanup');

describe('neon scenarios', () => {

  it('should reset the generator', () => {
    let neon = new Neon();
    let colours = new Array();
    for (var i = 0; i < 8; i++){
    	colours.push(neon.getNextColour());
    }
    // console.log(colours);
    assert.equal(colours.length,8);
    assert(colours[colours.length -1] != undefined);
  });

});