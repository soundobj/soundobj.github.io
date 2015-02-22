// neon.js
export class Neon {

	constructor(iterator) {	
  		this.iterator = iterator;
	}

	getElement() {
		return this.iterator.next();
	}
}