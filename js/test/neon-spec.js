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
  	// console.log(`flickerEvent ${flickerEvent}`);
  	// console.log(animationSequences);
  	
  	// assert(animationSequences[neon.sequenceLength].colour != animationSequences[0].colour);
  	assert(animationSequences[flickerEvent-1].flicker,"bla happy days");

  });

  it('should dynamically pass arguments to a generator', () => {
  	let neon = new Neon();


  	let values = new Array("a","b","c");

  		let iterator = neon.iterator(values);

  		for(var i = 0; i < 8; i++){
  			console.log(iterator.next());
  		}

	});

  it("should compare words lengths", () => {
  		let neon = new Neon();
  		let shortWord = new Array("T","H","E");
  		let longWord = new Array("L","O","N","G","E","R");
  		assert(neon.getLongestWord(shortWord,longWord) == longWord);
  });

  it("should create sequence of first word forwards and last word backwards", () => {
  		let neon = new Neon();
  		let shortWord = new Array("T","H","E");
  		let longWord = new Array("L","O","N","G","E","R");
  		let sequence = neon.firstWordForwardsLastWordBackwards(shortWord,longWord);
  		assert(sequence[0].every(function(element,index){ return element === ["T","R"][index]; }));
  		assert(sequence[3].every(function(element,index){ return element === ["N"][index]; }));
  		assert(sequence.length == longWord.length);
  });



});