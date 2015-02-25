// randomFlicker.js
export class RandomFlicker {

	constructor(elements) {	
  		this.elements = elements;
  		this.randomGenerator = this.random();
	}

	*random() {
		while (true) {
			console.log(this.elements[Math.floor(Math.random()*this.elements.length)]);
			yield this.elements[Math.floor(Math.random()*this.elements.length)];
		}
	}

	getElement() {	
		return this.randomGenerator.next();
	}
}