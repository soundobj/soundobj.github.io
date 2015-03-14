// neon.js
export class Neon {

	constructor() {	
		this.colourIterator = this.colours();
		this.letterSequenceIterator = this.letterSequence(); 
	}

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
		yield ['N','L'];
		yield ['O1','E'];
		yield ['O','U'];
		yield ['N1','N2'];
		yield ['G'];
		yield ['E1'];
	}

	getNextLetterSquence() {
		let letterSequence = this.letterSequenceIterator.next();
		// reset the iterator if arrived to the last element
		if(letterSequence.done) {
			this.letterSequenceIterator = this.colours();
			// letterSequence = this.letterSequenceIterator.next();
		}
		return letterSequence;
	}


}