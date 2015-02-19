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


//$("g").not('[id^="tube"]');

// $("#O").find("[id^='end']").each(function(){
// 	console.log(this.id);
// 	$("#" + this.id).attr("class","tube");
// })


/*
one problem that we have now is that is we clone a shape and we apply a filter to its parent then
the clone gets the filter applied to. one way around it is to create a <def> of the shape to be cloned
and then make two copies and apply the filter to each separately. however there is no way to target sub elements
withing a clone so the filter gets added to all subshapes. a way around it is to create two shapes per letter
one the red and one the tube and position them layered. then we have autonomy when applying filters and colours
 */
// finds childs within shape at any depth
$("g[id='N2']").find("[id^='tube']").each(function(){$('#' + this.id).attr('filter','url(#blur)');});