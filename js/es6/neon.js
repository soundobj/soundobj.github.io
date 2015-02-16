// neon.js
export class Neon {

	constructor(elements) {	
  		this.elements = elements;
	}
	/**
	 * [sayHi description]
	 * @param  {String} name [description]
	 * @return {[type]}      [description]
	 */
  	sayHi(name = 'Anonymous') {
    	console.log(`Hi neon 7 ${name}!`);
    	console.log(this.elements);
    	return (`Hi neon 7 ${name}!`);
  	}

  	value() {
    	return 'works';
	}
}

var neon = new Neon(
	[['N','E','O','N1'],['L','O1','U','N2','G','E1']]
);
neon.sayHi();