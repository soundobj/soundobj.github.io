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
		this.lastSequence = [];
	}

	setup(rows){
		this.rows = rows;
		this.addSequencer(this.firstRowForwardsLastRowBackwards);
		this.addSequencer(this.shuffle);
		this.addSequencer(this.zigzag);
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

	static getBiggestArray(rows){
		return (rows[0].length > rows[1].length) ? rows[0] : rows[1];
	}

	static arraysEqual(arr1, arr2) {
	    if(arr1.length !== arr2.length) {
	        return false;
	    }
	    for(var i = arr1.length; i--;) {
	        if(arr1[i] !== arr2[i]) {
	            return false;
	        }
	    }
	    return true;
	}

	static mergeArrays(arrays,flat=false){
		var biggerArray = Neon.getBiggestArray(arrays);
		var smallerArray = Neon.arraysEqual(arrays[0],biggerArray) ? arrays[1] : arrays[0];
		let merged = new Array();
		for(var i=0; i < biggerArray.length; i++){
			let temp = (flat) ? merged : new Array();
			temp.push(biggerArray[i]);
			if(smallerArray[i]){
				temp.push(smallerArray[i]);
			}
			if(!flat){
				merged.push(temp);
			}
		}
		return merged;
	}

	firstRowForwardsLastRowBackwards(rows){
		console.log(`called fisrt row longest`);
		return Neon.mergeArrays([rows[0],(rows[1].slice()).reverse()]);
	}

	zigzag(rows){
		console.log(`called zig zag flat`);
		return Neon.mergeArrays([rows[0],rows[1]],true);
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

	wrapIntoArray(value){
		return (value.constructor === Array) ? value : [value];
	}

	animate1(){

		let instructions = {};		
		this.sequenceCounter++; // update the sequenceCounter
		let sequence = this.sequencer.next();

		if (sequence.done){
			this.initSequencer();
			//sequence = this.sequencer.next();
			sequence.startSequence = true;
			sequence.value = [];

			this.colour = this.getNextColour();
			this.sequenceCounter = 0; // reset the sequence counter
		} else {
			this.lastSequence = this.wrapIntoArray(sequence.value);
		}

		// if its time to flicker a random letter, then specify it an generate a new
		// random interval
		if (this.sequenceCounter == this.flickerEvent){
			instructions["flicker"] = true;
			this.flickerEvent = this.getRandomInt(3,this.flickerInterval);
			console.log(`doing a new flicker event ${this.flickerEvent}`);
		}

		instructions["colour"] = this.colour.value;
		instructions["letterSequence"] = this.wrapIntoArray(sequence.value);
		instructions["startSequence"] = sequence.startSequence;

		return instructions;
	}

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}