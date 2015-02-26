// randomFlicker.js
export class RandomFlicker {

	constructor(elements) {	
  		this.elements = elements;
  		this.randomGenerator = this.random();
	}

	*random() {
		while (true) {
			yield this.elements[Math.floor(Math.random()*this.elements.length)];
		}
	}

	getElement() {	
		return this.randomGenerator.next();
	}

	//TODO write test for this function
	getDifferentElement(element){
		var elementIndex = this.elements.indexOf(element);
		if(elementIndex == 0 || elementIndex == this.elements.length -1){
			return {value:this.elements[1],done:false};
		} else {
			return {value:this.elements[--elementIndex],done:false};
		}	
	}
}