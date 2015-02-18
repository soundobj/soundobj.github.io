// colour-paletter.js
export class ColourPalette {

	constructor() {	

	}

	/** 
	 * 	rgbColorSequence returns a colors rgb sequence, works by mixing rgb values
	 * 	using sine wave value generation
	 * 
	 * @param  {number} redFreq  	red value wave oscillation speed
	 * @param  {number} redPhase    red value sine phase
	 * @param  {number} greenFreq   green value wave oscillation speed
	 * @param  {number} greenPhase  green value sine phase
	 * @param  {number} blueFreq    blue value wave oscillation speed
	 * @param  {number} bluePhase   blue value sine phase
	 * @param  {number} center      center wave position
	 * @param  {number} width       how high or low is the wave
	 * @param  {number} paletteSize number of elements in colors
	 * @return {[[number]]} colors  each subelemnt has three values in sequence for red green and blue
	 */
	static rgbColourSequence(redFreq,redPhase,greenFreq,greenPhase,blueFreq,bluePhase,center= 128,width=127,paletteSize=50){
		var colours = new Array();
		for (var i =0; i < paletteSize; ++i){
			colours.push([
				Math.sin(redFreq * i + redPhase) * width + center,
				Math.sin(greenFreq * i + greenPhase) * width + center,
				Math.sin(blueFreq * i + bluePhase) * width + center,
			]);
		}
		return colours;
	}

	static RGB2Colour(r,g,b){
    	return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
  	}

	static sampleColours(colours,DOMParent) {
		Array.from(colours).forEach(function (el){
			$(DOMParent).append("<font color=" + ColourPalette.RGB2Colour(el[0],el[1],el[2]) + ">&#9608;</font>");
		});
	}
}

//var colourPalette = new ColourPalette();

var steps = 6;
var freq = 2*Math.PI/steps;
var repeatCycles = ColourPalette.rgbColourSequence(freq,freq,freq,0,2,4,128,127,steps);
ColourPalette.sampleColours(repeatCycles,"#palettes");