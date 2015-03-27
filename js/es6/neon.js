// neon.js
export class Neon {

	constructor() {	
		this.colourIterator = undefined;
		this.colours = undefined;
		this.colour = undefined;

		this.sequencers = undefined;
		this.sequencer = undefined;
		this.iterableSequencers = [];
		this.rows = undefined;
	}
	/**
	 * initialises default assets: colours and DOM ids and also instantiates
	 * the generators that drive the animation
	 * 
	 * @param  Array rows    List of Arrays containing groups of DOM ids
	 * @param  Array colours List of rgb(n,n,n) colour definitions
	 * @return void
	 */
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
	/**
	 * add a callback to the list of sequencers
	 * 
	 * @param Function callback callbacks must return
	 * and array of DOM elements thus forming the animation sequence
	 * @return void
	 */
	addSequencer(callback){		
		this.iterableSequencers.push(callback);
	}
	/**
	 * manages the lifecycle of generator based sequencers, when the sequencers
	 * generator is done it instantiates a new sequencers generator and sets the 
	 * current sequencer to a newly instantiated sequencer using the supplied rows
	 *
	 * @return void
	 */
	initSequencer(){
		let sequencer = this.sequencers.next();
		if (sequencer.done){
			this.initSequencers();
			sequencer = this.sequencers.next();
		}
		this.sequencer = this.iterator(sequencer.value(this.rows));
	}
	/**
	 * instatiates a new generator that yield sequencers
	 * @return void
	 */
	initSequencers(){
		this.sequencers = this.iterator(this.iterableSequencers);
	}
	/**
	 * generic generator: pass an array and get a generator of the values
	 * of that array
	 * 
	 * @param Array elements a list of values
	 * @return Function generator
	 */
	*iterator(elements) {
		for(let value of elements.values()){
			yield value;
		}
	}
	/**
	 * find which of two arrays has more values
	 * 
	 * @param  Array arrays two dimensional array containing two arrays
	 * @return Array        the array with more values
	 */
	static getBiggestArray(arrays){
		return (arrays[0].length > arrays[1].length) ? arrays[0] : arrays[1];
	}
	/**
	 * checks if two arrays are equal
	 * 
	 * @param  Array arr1 an array
	 * @param  Array arr2 an array
	 * @return Boolean}      true if equal false otherwise
	 */
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
	/**
	 * Merges two arrays into a single multidimensional array if flat is false otherwise
	 * into an array:
	 * a = [1,2]
	 * b = [5,6]
	 * flat = false result => [[1,5],[2,6]]
	 * flat = true result => [1,5,2,6]
	 * 
	 * @param  {Array}  arrays two dimensional array with two elements
	 * @param  {Boolean} flat   if true return a multidimensional array
	 * @return {Array}         the merged arrays
	 */
	static mergeArrays(arrays,flat=false){
		var biggerArray = Neon.getBiggestArray(arrays);
		var smallerArray = Neon.arraysEqual(arrays[0],biggerArray) ? arrays[1] : arrays[0];
		let merged = [];
		for(var i=0; i < biggerArray.length; i++){
			let temp = (flat) ? merged : [];
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
	/**
	 * checks if the value is an array if not it will return an array with the 
	 * value as its first element
	 * 
	 * @param  {Array} value the value to check
	 * @return {Array}       an array
	 */
	static wrapIntoArray(value){
		return (value.constructor === Array) ? value : [value];
	}
	/**
	 * generates a sequence of value utilising the values provided in rows
	 * rows is a two dimensional array, it reverses the values of the second supplied
	 * array and uses mergeArrays to create the sequence
	 * 
	 * @param  {Array} rows two dimensional array with two elements
	 * @return {Array}      two dimensional array
	 */
	firstRowForwardsLastRowBackwards(rows){
		return Neon.mergeArrays([rows[0],(rows[1].slice()).reverse()]);
	}
	/**
	 * generates a sequence of value utilising the values provided in rows
	 * rows is a two dimensional array, it merges the values of the first and second
	 * arrays and uses mergeArrays to create the sequence
	 * 
	 * @param  {Array} rows two dimensional array with two elements
	 * @return {Array}      array
	 */
	zigzag(rows){
		return Neon.mergeArrays([rows[0],rows[1]],true);
	}
	/**
	 * generates a sequence of value utilising the values provided in rows
	 * rows is a two dimensional array, it concatenates the values of both arrays
	 * in rows and randomizes them
	 * 
	 * @param  {Array} rows two dimensional array with two elements
	 * @return {Array}      array
	 */
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
	/**
	 * manages the lifecycle of the colour iterator
	 * when the generator is done it instantiates a new generator
	 * and it skips the undefined value yielded when done
	 * 
	 * @return {Function} generator
	 */
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
	/**
	 * manages the lifecylce of instructions for the animation
	 * it yields the elements to animate. when a sequencer is done
	 * it flags it with a startSequence boolean and yields a new colour
	 * 
	 * @return {Object} the instructions for the animation
	 */
	animate(){
		let instructions = {};		
		let sequence = this.sequencer.next();

		if (sequence.done){
			this.initSequencer();
			sequence.startSequence = true;
			sequence.value = [];
			this.colour = this.getNextColour();
		} 

		instructions.colour = this.colour.value;
		instructions.letterSequence = Neon.wrapIntoArray(sequence.value);
		instructions.startSequence = sequence.startSequence;
		return instructions;
	}

}