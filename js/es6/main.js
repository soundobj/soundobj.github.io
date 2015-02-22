import {Neon} from '../es6/neon.js'
import {RandomFlicker} from '../es6/randomFlicker.js'

var neonWords = [['N','E','O','N1'],['L','O1','U','N2','G','E1']];
var randomFlicker = new RandomFlicker(neonWords[0].concat(neonWords[1]));
var neonRandom = new Neon(randomFlicker.random());

// for (var i=0; i < 20; i++) {
// 	console.log(neonRandom.getElement());
// }

// randomFlicker.loop(neonRandom);

console.log("after loop");

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
$("g[id='G']").find("[id^='tube']").each(function(){
	var originalColour = $('#' + this.id).attr('fill');
	console.log(originalColour);
	$('#' + this.id).attr('fill','url(#upper)');
	document.getElementById("animate1").setAttribute("to",originalColour);
	document.getElementById("animate0").beginElement()
});
;

//$("animate[id='animate0']").beginElement();



// var svg = document.getElementById("neon").contentDocument;

// console.log(svg.querySelector("document"));

	console.log("done apply fill");