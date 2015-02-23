import {Neon} from '../es6/neon.js'
import {RandomFlicker} from '../es6/randomFlicker.js'

var neonWords = [['N','E','O','N1'],['L','O1','U','N2','G','E1']];
var randomFlicker = new RandomFlicker(neonWords[0].concat(neonWords[1]));
var neonRandom = new Neon(randomFlicker.random());
// window.neonRandom = neonRandom;
// 
// 

window.neonRandom = randomFlicker;

// for (var i=0; i < 20; i++) {
// 	console.log(neonRandom.getElement());
// }