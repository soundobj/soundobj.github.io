// neon.js
export class Neon {

	constructor() {	
		this.colourIterator;
		this.colours;
		this.colour;

		this.sequencers;
		this.sequencer;
		this.iterableSequencers = new Array();
		this.rows;
	}

	setup(rows,colours){
		
		this.rows = rows;
		this.addSequencer(this.firstRowForwardsLastRowBackwards);
		this.addSequencer(this.shuffle);
		this.addSequencer(this.zigzag);
		this.initSequencers();
		this.initSequencer();

		this.colours = colours;
		this.colourIterator = this.iterator(this.colours);
		this.colour = this.getNextColour();
	}

	addSequencer(callback){		
		this.iterableSequencers.push(callback);
	}

	initSequencer(){
		let sequencer = this.sequencers.next();
		if (sequencer.done){
			this.initSequencers();
			sequencer = this.sequencers.next();
		}
		this.sequencer = this.iterator(sequencer.value(this.rows));
	}

	initSequencers(sequencers){
		this.sequencers = this.iterator(this.iterableSequencers);
	}

	*iterator(elements) {
		for(let value of elements.values()){
			yield value;
		}
	}

	static getBiggestArray(arrays){
		return (arrays[0].length > arrays[1].length) ? arrays[0] : arrays[1];
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

	static wrapIntoArray(value){
		return (value.constructor === Array) ? value : [value];
	}

	firstRowForwardsLastRowBackwards(rows){
		return Neon.mergeArrays([rows[0],(rows[1].slice()).reverse()]);
	}

	zigzag(rows){
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

	getNextColour() {
		let colour = this.colourIterator.next();
		// reset the iterator if arrived to the last element
		if(colour.done) {
			this.colourIterator = this.iterator(this.colours);
			// skip the undefined value
			colour = this.colourIterator.next();
		}			
		return colour;
	}

	animate(){
		let instructions = {};		
		let sequence = this.sequencer.next();

		if (sequence.done){
			this.initSequencer();
			sequence.startSequence = true;
			sequence.value = [];
			this.colour = this.getNextColour();
		} 

		instructions["colour"] = this.colour.value;
		instructions["letterSequence"] = Neon.wrapIntoArray(sequence.value);
		instructions["startSequence"] = sequence.startSequence;
		return instructions;
	}

}