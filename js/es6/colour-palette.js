// colour-paletter.js
export class ColourPalette {

	constructor() {	

	}

	/** 
	 * [
	 * 	rgbColorSequence returns a rainbow rgb sequence, works by mixing rgb values
	 * 	using sine wave value generation
	 * ]
	 * @param  {number} redFreq    	red value wave oscillation speed
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
	rgbColorSequence(redFreq,redPhase,greenFreq,greenPhase,blueFreq,bluePhase,center= 128,width=127,paletteSize=50){
		var colors = new Array();
		for (var i =0; i < paletteSize; ++i){
			colors.push(
				Math.sin(redFreq * i + redPhase) * width + center,
				Math.sin(greenFreq * i + greenPhase) * width + center,
				Math.sin(blueFreq * i + bluePhase) * width + center,
			);
		}
		return colors;
	}
}