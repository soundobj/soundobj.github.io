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

	// TODO: create function next();
	// detach the animation
	// $("g[id='G'] animate").detach;
	// 
	// attach it to the next random letter
	// 
	// change the onend callback to neonRandom.next()
	// restart the animation with id beginElement()
}