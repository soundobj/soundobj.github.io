import {Neon} from '../es6/neon.js'
import {RandomFlicker} from '../es6/randomFlicker.js'

var neonWords = [['N','E','O','N1'],['L','O1','U','N2','G','E1']];
var randomFlicker = new RandomFlicker(
	neonWords[0].concat(neonWords[1])
);

var neon = new Neon();
neon.setup([['N','E','O','N1'],['L','O1','U','N2','G','E1']]);

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

	var animIterationEventNames = {
	  "WebkitAnimation" : "webkitAnimationIteration",
	  "MozAnimation"    : "animationiteration",
	  "OAnimation"      : "oAnimationIteration",
	  "msAnimation"     : "MSAnimationIteration",
	  "animation"       : "animationiteration"
	};
	
	var animEndEventNames = {
	  "WebkitAnimation" : "webkitAnimationEnd",
	  "MozAnimation"    : "animationend",
	  "OAnimation"      : "oAnimationend",
	  "msAnimation"     : "MSAnimationEnd",
	  "animation"       : "animationend"
	};

    for(t in animEndEventNames){
        if( el.style[t] !== undefined ){
            return animEndEventNames[t];
        }
    }
}

/* Listen for a transition! */
let transitionEvent = whichTransitionEvent();
$("#neon g").on(transitionEvent,function(e) {
	$("#neon g").attr("class","");	
	let animate = neon.animate1();

	console.log(animate);
	console.log($("#neon g").attr("class"));
	
	// change the colours of the letters in the sequence
	if(animate.letterSequence){
		let currentElement;
	 	for (let elem of animate.letterSequence.values()) {
	        console.log(`just, elem ${elem}`);
	        $("#" + elem).attr("stroke",animate.colour);
	        currentElement = elem;
	    }

	    if(animate.flicker){
	    	$("#" + currentElement).attr("class","bulb");
	    } else {
	    	$("#" + currentElement).attr("class","delay");
	    }

	    if(animate.startSequence){
		    console.log("start seq");
			var nextLetter = randomFlicker.getElement();
			if(nextLetter.value === e.target.id){
				nextLetter = randomFlicker.getDifferentElement(nextLetter.value);
			}
			console.log(`current letter ${e.target.id} new letter ${nextLetter.value}`);
			$("#" + nextLetter.value).attr("class","bulb");	
	    }	
	} 
});