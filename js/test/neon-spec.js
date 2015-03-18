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

  it('should change color when a text sequence is completed and random flicker present', () => {
  	let neon = new Neon();
  	var flickerEvent = neon.flickerEvent;
  	let animationSequences = new Array();
  	for (var i = 0; i < 8; i++) {
  		animationSequences.push(neon.animate());
  	}
  	console.log(`flickerEvent ${flickerEvent}`);
  	console.log(animationSequences);
  	
  	assert(animationSequences[neon.sequenceLength].colour != animationSequences[0].colour);
  	assert(animationSequences[flickerEvent-1].flicker,"bla happy days");

  });
});