---
layout: post
title:  "Javascript CSS animation"
date:   2015-02-21 16:49:40
categories: Es6 JavaScript CSS
---

Following my previous post I will look at how to utilise Javascript to create an animation on a group of SVG elements. You can see the result on this site's banner. The rationale for this animation is to create sweeping effects to change the colour of the SVG elements. you can look at the full source code on [Github][sourceCode].

## CSS animation event register 

Modern Browsers support javascript callbacks on a number of [CSS animation events][animationEvent]. This way we can capture a particular CSS animation state and act upon it. In this example I will be using the [animationend] animationend event. To succesfully handle this event in all major browser, we ought to use browser prefixes. We can create a simple mapping function to utilise the pertinent prefix:

{% highlight javascript %}
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
{% endhighlight %}

## Es6 Generators

[generators][Generators] are a very powerful es6 feature; they are functions that can be exited and later re-entered thus maintaining their context. They have a lot of asynchronous applications. In our example we will use them to iterate through animation sequences. We will apply a CSS class to an element in the sequence, once the animationend event bubbles we will capture and use it to request the next element in the sequence and thus continuing to trasverse the sequence. We will use the `.done` generator flag to move on to the next animation sequence. We can pass arguments to generators, this is useful because it allows us to abstract the contents of a generator:

{% highlight javascript %}
/**
 * Neon.js 		
 * generic generator: pass an array and get a generator of the values
 * of that array
 * 
 * @param Array elements a list of values
 * @return Function generator
 */
*iterator(elements) {
	for(let value of elements.values()){
		yield value;
	}
}
{% endhighlight %}

We would like to have multiple animation effects so the experience is varied. I have come up with 3 different patterns for this example. But how do we go about managing the lifecycle of these? Ideally we would like finish one pattern and then start another and so forth; when the last pattern is `.done` comeback to the first one again.

{% highlight javascript %}
/**
 * Neon.js
 * add a callback to the list of patterns
 * 
 * @param Function callback callbacks must return
 * and array of DOM elements thus forming the animation sequence
 * @return void
 */
addAnimationPattern(callback){		
	this.animationPatternCallbacks.push(callback);
}
/**
 * manages the lifecycle of generator based patterns, when the patterns
 * generator is done it instantiates a new patterns generator and sets the 
 * current sequencer to a newly instantiated sequencer using the supplied rows
 *
 * @return void
 */
initSequencer(){
	let sequencer = this.patterns.next();
	if (sequencer.done){
		this.initPatterns();
		sequencer = this.patterns.next();
	}
	this.sequencer = this.iterator(sequencer.value(this.rows));
}
/**
 * instatiates a new generator that yield patterns
 * @return void
 */
initPatterns(){
	this.patterns = this.iterator(this.animationPatternCallbacks);
}
{% endhighlight %}

We group the different patterns in `this.animationPatternCallbacks`. Each pattern is a callback to a method that takes the elements to be sequenced as an argument. The output of the method will be the arguments for `this.sequencer` which in itself is a generator. `this.patterns` is a generator that yields each callback in turn. Once we have reached `.done` on any generator we instantiate a fresh generator to start the whole process again.

## Generating different animation patterns

to create a random shuffle pattern I have implemented the [Fisher–Yates shuffle][shuffle] algorithm:

{% highlight javascript %}
/**
 * generates a sequence of value utilising the values provided in rows
 * rows is a two dimensional array, it concatenates the values of both arrays
 * in rows and randomizes them
 * 
 * @param  {Array} rows two dimensional array with two elements
 * @return {Array}      array
 */
shuffle(rows) {
  let array = rows[0].concat(rows[1]);	
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
{% endhighlight %}

I have also created other patterns concatenating elements of each word in the logo.

{% highlight javascript %}
/**
 * generates a sequence of value utilising the values provided in rows
 * rows is a two dimensional array, it reverses the values of the second supplied
 * array and uses mergeArrays to create the sequence
 * 
 * @param  {Array} rows two dimensional array with two elements
 * @return {Array}      two dimensional array
 */
firstRowForwardsLastRowBackwards(rows){
	return Neon.mergeArrays([rows[0],(rows[1].slice()).reverse()]);
}
/**
 * generates a sequence of value utilising the values provided in rows
 * rows is a two dimensional array, it merges the values of the first and second
 * arrays and uses mergeArrays to create the sequence
 * 
 * @param  {Array} rows two dimensional array with two elements
 * @return {Array}      array
 */
zigzag(rows){
	return Neon.mergeArrays([rows[0],rows[1]],true);
}
{% endhighlight %}

One thing to consider when executing the callback is that their context is unique and any calls to external method smust be of a static nature. thus `Neon.mergeArrays` instead of `this.mergeArrays`.

## Putting it all together

`animate()` is the main method called by the CSS `animationend` callaback once a sequence pattern is `.done` a new colour is generated for the new sequence. We flag we starting a new sequence `instructions.startSequence` so we can provide an animation gap between patterns.

{% highlight javascript %}
/**
 * Neon.js
 * manages the lifecylce of instructions for the animation
 * it yields the elements to animate. when a sequencer is done
 * it flags it with a startSequence boolean and yields a new colour
 * 
 * @return {Object} the instructions for the animation
 */
animate(){
	let instructions = {};		
	let sequence = this.sequencer.next();

	if (sequence.done){
		this.initSequencer();
		sequence.startSequence = true;
		sequence.value = [];
		this.colour = this.getNextColour();
	} 

	instructions.colour = this.colour.value;
	instructions.letterSequence = Neon.wrapIntoArray(sequence.value);
	instructions.startSequence = sequence.startSequence;
	return instructions;
}
{% endhighlight %}

We perform a `setup()` on `Neon.js` to set the colours for the animation and the DOM id elements to animate, it also initialises the animationPatters.

{% highlight javascript %}
// main.js
import {Neon} from '../es6/neon.js';
var neon = new Neon();
neon.setup(
	[['N','E','O','N1'],['L','O1','U','N2','G','E1']],
	['rgb(255,183,10)','rgb(25,110,238)','rgb(6,162,95)','rgb(200,30,80)']
);

{% endhighlight %}

Below is the animationend handler, our selector is a group of svg elements. [One Caveat][restartAnimation] with CSS animations is that unless there is a reflow of the element that was previously triggered the animation won't restart.
so we opted for the cross browser element clone solution. for each element on the sequence we change the stroke attribute to the new colour. Also we check for an `animate.startSequence` to apply a longer delay animation between patterns. 

{% highlight javascript %}

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

{% endhighlight %}

We are only using CSS animation as a delay mechanism and trigger of color changes on the elements; here is the sass

{% highlight sass %}
$duration: 0.01s;

.delay {
  animation-delay: $duration;
  animation-name: glow-two;
  animation-duration: 0.1s;

  -moz-animation-delay: $duration;
  -moz-animation-name: glow-two;
  -moz-animation-duration: 0.1s;

  -webkit-animation-delay: $duration;
  -webkit-animation-name: glow-two;
  -webkit-animation-duration: 0.1s;
}

@keyframes glow-two {
  to {fill: $yellow-color;}
}
{% endhighlight %}

We are targeting a hidden property of the SVG element on the animation keyframe so nothing really changes on the animation. Thanks for reading.


[animationend]:https://developer.mozilla.org/en-US/docs/Web/Events/animationend
[animationEvent]:http://www.w3.org/TR/css3-animations/#AnimationEvent-types
[generators]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[shuffle]:http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
[restartAnimation]:https://css-tricks.com/restart-css-animation/
[sourceCode]:https://github.com/soundobj/soundobj.github.io/tree/master/js/es6

