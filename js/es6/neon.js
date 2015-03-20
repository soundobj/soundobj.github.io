// neon.js
export class Neon {

	constructor() {	
		this.colourIterator = this.colours();
		this.letterSequenceIterator = this.letterSequence(); 		
		this.sequenceCounter = 0;
		this.flickerInterval = 6;
		this.flickerEvent = this.getRandomInt(3,this.flickerInterval);
		this.colour = this.getNextColour();
	}

	*iterator(elements) {
		for(let value of elements.values()){
			yield value;
		}
	}

	getLongestWord(firstWord,lastWord){
		return (firstWord.length > lastWord.length) ? firstWord : lastWord;
	}

	firstWordForwardsLastWordBackwards(firstWord,lastWord){
		//check the longest word out of the two
		let longestWord = this.getLongestWord(firstWord,lastWord);
		
		lastWord = lastWord.reverse();
		let sequence = new Array();
		for(let i of longestWord.keys()){
			let sequenceLetters = new Array();
			if(firstWord[i]){
				sequenceLetters.push(firstWord[i]);
			}
			if(lastWord[i]){
				sequenceLetters.push(lastWord[i]);
			}
			sequence.push(sequenceLetters);
		}
		return sequence;
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

	getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}