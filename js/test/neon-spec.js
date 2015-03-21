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

  // it('should change color when a text sequence is completed and random flicker present', () => {
  // 	let neon = new Neon();
  // 	let flickerEvent = neon.flickerEvent;
  // 	let animationSequences = new Array();
  // 	for (let i = 0; i < 8; i++) {
  // 		animationSequences.push(neon.animate());
  // 	}
  // 	// console.log(`flickerEvent ${flickerEvent}`);
  // 	// console.log(animationSequences);
  	
  // 	// assert(animationSequences[neon.sequenceLength].colour != animationSequences[0].colour);
  // 	assert(animationSequences[flickerEvent-1].flicker);

  // });

  it("should compare rows lengths", () => {
	let neon = new Neon();
	let shortWord = new Array("T","H","E");
	let longWord = new Array("L","O","N","G","E","R");
	assert(neon.getLongestRow([shortWord,longWord]) == longWord);
  });

  it("should create sequence of first row forwards and last row backwards", () => {
	let neon = new Neon();
	let shortWord = new Array("T","H","E");
	let longWord = new Array("L","O","N","G","E","R");
	let sequence = neon.firstRowForwardsLastRowBackwards([shortWord,longWord]);
	assert(sequence[0].every(function(element,index){ return element === ["T","R"][index]; }));
	assert(sequence[3].every(function(element,index){ return element === ["N"][index]; }));
	assert(sequence.length == longWord.length);
  });

  it("should spawn a new sequence iterator when needed", () => {
  	let neon = new Neon();
  	neon.addSequencer(function(rows){
  		return rows[0].concat(rows[1]);
  	});
  	neon.rows = [["A"],["B"]];
  	neon.initSequencers();
  	neon.initSequencer();
  	var sequences = new Array();
  	for(var i = 0; i < 4; i++){
  		sequences.push(neon.animate1());
  	}
  	console.log(sequences);
  	assert(sequences[0].letterSequence == 'A');
  	assert(sequences[1].letterSequence == 'B');
  	assert(sequences[2].letterSequence == 'A');
  	assert(sequences[2].startSequence);
  	assert(sequences[3].letterSequence == 'B');
  	assert(sequences[0].colour != sequences[2].colour);

  });

  // it('DYNAMIC should change color when a text sequence is completed and random flicker present', () => {
  // 	let neon = new Neon();
  // 	neon.addSequencer(function(rows){
  // 		return rows[0].concat(rows[1]);
  // 	});
  // 	neon.rows = [["A"],["B"]];
  // 	neon.initSequencers();
  // 	neon.initSequencer();
  // 	var sequences = new Array();
  // 	for(var i = 0; i < 4; i++){
  // 		sequences.push(neon.animateSequences());
  // 	}
  // });

});