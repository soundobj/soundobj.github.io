// neon.js
export class Neon {

	constructor() {	
		// console.log("enter new neon");
		this.colourIterator = this.colours();
		this.letterSequenceIterator = this.letterSequence(); 		
		this.sequenceCounter = 0;
		this.flickerInterval = 6;
		this.flickerEvent = this.getRandomInt(3,this.flickerInterval);
		this.colour = this.getNextColour();

		this.sequencers;
		this.sequencer;
		this.iterableSequencers = new Array();
		this.rows;
	}

	setup(rows){
		this.rows = rows;
		this.addSequencer(this.firstRowForwardsLastRowBackwards);
		this.addSequencer(this.shuffle);
		this.initSequencers();
		this.initSequencer();
	}

	addSequencer(callback){		
		this.iterableSequencers.push(callback);
	}

	initSequencer(){
		let sequencer = this.sequencers.next();
		if (sequencer.done){
			console.log('restart initSequencer');
			this.initSequencers();
			sequencer = this.sequencers.next();
		}
		this.sequencer = this.iterator(sequencer.value(this.rows));
	}

	initSequencers(sequencers){
		this.sequencers = this.iterator(this.iterableSequencers);
	}

	animateSequences(){
		let sequence = this.sequencer.next();
		if (sequence.done){
			this.initSequencer();
			sequence = this.sequencer.next();
			sequence.startSequence = true;
		}
		return sequence;		 
	}

	*iterator(elements) {
		for(let value of elements.values()){
			yield value;
		}
	}

	static getLongestRow(rows){
		return (rows[0].length > rows[1].length) ? rows[0] : rows[1];
	}

	firstRowForwardsLastRowBackwards(rows){
		
		let longestWord = Neon.getLongestRow(rows);
		console.log(`called fisrt row longest is ${longestWord}`);
		let firstRow = rows[0];
		let lastRow = (rows[1].slice()).reverse();
		let sequence = new Array();
		for(let i of longestWord.keys()){
			let sequenceLetters = new Array();
			if(firstRow[i]){
				sequenceLetters.push(firstRow[i]);
			}
			if(lastRow[i]){
				sequenceLetters.push(lastRow[i]);
			}
			sequence.push(sequenceLetters);
		}
		return sequence;
	}

	shuffle(rows) {

	  let array = rows[0].concat(rows[1]);	
	  let currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	// old working code

	*colours() {
		yield 'rgb(255,183,10)';
		yield 'rgb(25,110,238)';
		yield 'rgb(6,162,95)'; 
		yield 'rgb(200,30,80)';
	}

	getNextColour() {
		let colour = this.colourIterator.next();
		// reset the iterator if arrived to the last element
		if(colour.done) {
			this.colourIterator = this.colours();
			// skip the undefined value
			colour = this.colourIterator.next();
		}			
		return colour;
	}

	*letterSequence() {
		//[['N','E','O','N1'],['L','O1','U','N2','G','E1']];

		// 1ST WORD FORWARDS, 2CND WORD BACKWARDS
		yield ['N','E1'];
		yield ['E','G'];
		yield ['O','N2'];
		yield ['N1','U'];
		yield ['O1'];
		yield ['L'];
		yield undefined; // denotes a sequence completion
		// snake zig zag
		yield ['N'];
		yield ['L'];
		yield ['O1'];
		yield ['E'];
		yield ['O'];
		yield ['U'];
		yield ['N1'];
		yield ['N2'];
		yield ['G'];
		yield ['E1'];
		yield undefined; // denotes a sequence completion
	}

	getNextLetterSquence() {
		let letterSequence = this.letterSequenceIterator.next();
		// reset the iterator if arrived to the last element
		if(letterSequence.done) {
			this.letterSequenceIterator = this.letterSequence();
		}
		return letterSequence;
	}

	animate(){	
		let instructions = {};

		// update the sequenceCounter
		this.sequenceCounter++;
		let sequence = this.getNextLetterSquence();

		// if we have finished a letter sequence then yield a new colour
		if (!sequence.value) {
			console.log("getting next colour value new");
			this.colour = this.getNextColour();
			sequence = this.getNextLetterSquence();			
			this.sequenceCounter = 0; // reset the sequence counter
		}

		// if its time to flicker a random letter, then specify it an generate a new
		// random interval
		if (this.sequenceCounter == this.flickerEvent){
			instructions["flicker"] = true;
			this.flickerEvent = this.getRandomInt(3,this.flickerInterval);
			console.log(`doing a new flicker event ${this.flickerEvent}`);
		}

		instructions["colour"] = this.colour.value;
		instructions["letterSequence"] = sequence.value;

		return instructions;
	}

	animate1(){

		let instructions = {};		
		this.sequenceCounter++; // update the sequenceCounter
		let sequence = this.sequencer.next();

		if (sequence.done){
			this.initSequencer();
			sequence = this.sequencer.next();
			sequence.startSequence = true;

			this.colour = this.getNextColour();
			this.sequenceCounter = 0; // reset the sequence counter
		}
		// if its time to flicker a random letter, then specify it an generate a new
		// random interval
		if (this.sequenceCounter == this.flickerEvent){
			instructions["flicker"] = true;
			this.flickerEvent = this.getRandomInt(3,this.flickerInterval);
			console.log(`doing a new flicker event ${this.flickerEvent}`);
		}

		instructions["colour"] = this.colour.value;
		instructions["letterSequence"] = (sequence.value.constructor === Array) ? sequence.value : [sequence.value];
		instructions["startSequence"] = sequence.startSequence;

		return instructions;
	}

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}