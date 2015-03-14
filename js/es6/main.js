import {Neon} from '../es6/neon.js'
import {RandomFlicker} from '../es6/randomFlicker.js'

var neonWords = [['N','E','O','N1'],['L','O1','U','N2','G','E1']];
var randomFlicker = new RandomFlicker(
	neonWords[0].concat(neonWords[1])
);

var neon = new Neon();

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

// var transitionEvent = whichTransitionEvent();
// $("#neon g").on(transitionEvent,function(e) {
// 	console.log("finished animaation");
// 	var className = $(e.target).attr("class");
// 	$(e.target).attr("class","");
// 	var nextLetter = randomFlicker.getElement();
// 	if(nextLetter.value === e.target.id){
// 		nextLetter = randomFlicker.getDifferentElement(nextLetter.value);
// 	}
// 	console.log(`current letter ${e.target.id} new letter ${nextLetter.value}`);
// 	$("#" + nextLetter.value).attr("class",className);
// });


/* Listen for a transition! */
var transitionEvent = whichTransitionEvent();
$("#neon g").on(transitionEvent,function(e) {
	console.log("finished");

});