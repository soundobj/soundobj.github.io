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

  it('should change color when a text sequence is completed', () => {
  	let neon = new Neon();
  	let animationSequences = new Array();
  	for (var i = 0; i < 8; i++) {
  		animationSequences.push(neon.animate());
  	}
  	console.log(neon.sequenceLength);
  	console.log(animationSequences);
  	assert(animationSequences[neon.sequenceLength].colour != animationSequences[0].colour);
  	// the flicker should only be present between 3 and 6 iterations
  	for(var i = 0; i < 4; i++) {
  		assert(animationSequences[i].flicker == undefined);
	}
  });
});