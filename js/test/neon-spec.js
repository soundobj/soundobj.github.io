import {Neon} from '../es6/neon'
var assert = require('assert');
require('./sinon-cleanup');

describe('neon scenarios', () => {

  it("should compare rows lengths", () => {
	let neon = new Neon();
	let shortWord = new Array("T","H","E");
	let longWord = new Array("L","O","N","G","E","R");
	assert(Neon.getBiggestArray([shortWord,longWord]) == longWord);
  });

  it("should create sequence of first row forwards and last row backwards", () => {
	let neon = new Neon();
	let shortWord = new Array("T","H","E");
	let longWord = new Array("L","O","N","G","E","R");
	let sequence = neon.firstRowForwardsLastRowBackwards([shortWord,longWord]);
	//console.log(sequence);
	assert(sequence[0].every(function(element,index){ return element === ["R","T"][index]; }));
	assert(sequence[3].every(function(element,index){ return element === ["N"][index]; }));
	assert(sequence.length == longWord.length);
  });

  it("should spawn a new sequence iterator when needed", () => {
  	let neon = new Neon();

  	// manual setup

  	neon.addAnimationPattern(function(rows){
  		return rows[0].concat(rows[1]);
  	});
  	neon.rows = [["A"],["B"]];
  	neon.initPatterns();
  	neon.initSequencer();

  	neon.colours = ['rgb(255,183,10)','rgb(25,110,238)','rgb(6,162,95)','rgb(200,30,80)'];
  	neon.colourIterator = neon.iterator(neon.colours);
	neon.colour = neon.getNextColour();


  	var sequences = new Array();
  	for(var i = 0; i < 4; i++){
  		sequences.push(neon.animate());
  	}
  	//console.log(sequences);
  	assert(sequences[0].letterSequence == 'A');
  	assert(sequences[1].letterSequence == 'B');
  	assert(sequences[2].letterSequence == false);
  	assert(sequences[2].startSequence);
  	assert(sequences[3].letterSequence == 'A');
  	assert(sequences[0].colour != sequences[2].colour);

  });

  it("should setup", () => {
	let neon = new Neon();
	neon.setup(
		[['N','E','O','N1'],['L','O1','U','N2','G','E1']],
		['rgb(255,183,10)','rgb(25,110,238)','rgb(6,162,95)','rgb(200,30,80)']
	);
	assert(neon.rows[0][0] == "N");
	assert(neon.sequencer != undefined);
  });

});