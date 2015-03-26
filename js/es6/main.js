import {Neon} from '../es6/neon.js'
var neon = new Neon();
neon.setup(
	[['N','E','O','N1'],['L','O1','U','N2','G','E1']],
	['rgb(255,183,10)','rgb(25,110,238)','rgb(6,162,95)','rgb(200,30,80)']
);

function whichAnimationEndEvent(){

    var t;
    var el = document.createElement('fakeelement');
	
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

let animationEndEvent = whichAnimationEndEvent();

$("#neon g").on(animationEndEvent,function(e) {

	$("#neon g").attr("class","");	
	let animate = neon.animate();

	// reflow https://css-tricks.com/restart-css-animation/
	//Prepend the clone & then remove the original element
	var el = $("#" + e.target.id );
    el.before( el.clone(true) ).remove();

	if(animate.startSequence){
		$("#" + e.target.id).attr("class","delayLong");
	} else {
		for (let elem of animate.letterSequence.values()) {
	        $("#" + elem).attr("stroke",animate.colour);
	    }
	    $("#" + e.target.id).attr("class","delay");
	} 
});