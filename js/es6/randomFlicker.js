// randomFlicker.js
export class RandomFlicker {

	constructor(elements) {	
  		this.elements = elements;
  		this.flickers = [5, 7, 9, 11, 13, 15, 17];
  		this.flickerNumber;
  		this.counter;
	}

	*random() {
		console.log("call random");
		while (true) {
			console.log(this.elements[Math.floor(Math.random()*this.elements.length)]);
			yield this.elements[Math.floor(Math.random()*this.elements.length)];
		}
	}
}

/*

	getElementColor(element) {
		if ($("#" + element).attr("stroke") !== undefined ){
			return {"attr":"stroke", "Value":$("#" + element).attr("stroke")};
		} else {
			return {"attr":"fill", "Value":$("#" + element).attr("fill")};
		}
	}

	randomFromInterval(from,to) {
		return Math.floor(Math.random()*(to-from+1)+from);
	}

	flicker() {		
		this.counter += 1;
		console.log("flicker enter");
		if (this.counter === this.flickerNumber) {
			console.log("flicker finish");
			return;
		}

		setTimeout(function () {
			// if(hasClass(randomLetter, 'off')) {
			// 	randomLetter.className = '';
			// }
			// else {
			// 	randomLetter.className = 'off';
			// }
			// 
			
			var elementColor = this.getElementColor(randomLetter);
			if(elementColor.value !== "rgb(0,0,0)") {
				console.log("setting to black" + randomLetter);
				$("#" + randomLetter).attr(elementColor.attr,"rgb(0,0,0)");
			} else {
				console.log("setting to default" + randomLetter);
				$("#" + randomLetter).attr(elementColor.attr,"rgb(200,30,80)"); 
			}

			flicker();
		}, 30);
	}

	loop(neonRandom) {
		
	    var rand = this.randomFromInterval(500,3000);
console.log("initialise loop e");
		this.randomLetter = neonRandom.getElement();
		//randomLetter = letters[randomLetter];
		console.log("initialise loop1");
		this.flickerNumber = this.randomFromInterval(0, 6);
		this.flickerNumber = this.flickers[this.flickerNumber];

	    setTimeout(function() {
	            this.counter = 0;
	            this.flicker();
	            loop();  
	    }, rand);
	}

}




// var textHolder = document.getElementsByTagName('div')[0],
//   text = textHolder.innerHTML,
// 	chars = text.length,
// 	newText = '',
// 	i;	

// for (i = 0; i < chars; i += 1) {
// 	newText += '<i>' + text.charAt(i) + '</i>';
// }

// textHolder.innerHTML = newText;

// var letters = document.getElementsByTagName('i'),
// 	flickers = [5, 7, 9, 11, 13, 15, 17],
// 	randomLetter,
// 	flickerNumber,
// 	counter;

// function randomFromInterval(from,to) {
// 	return Math.floor(Math.random()*(to-from+1)+from);
// }

// function hasClass(element, cls) {
//     return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
// }

// function flicker() {		
// 	counter += 1;
	
// 	if (counter === flickerNumber) {
// 		return;
// 	}

// 	setTimeout(function () {
// 		if(hasClass(randomLetter, 'off')) {
// 			randomLetter.className = '';
// 		}
// 		else {
// 			randomLetter.className = 'off';
// 		}

// 		flicker();
// 	}, 30);
// }

// (function loop() {
//     var rand = randomFromInterval(500,3000);

// 	randomLetter = randomFromInterval(0, 3);
// 	randomLetter = letters[randomLetter];
	
// 	flickerNumber = randomFromInterval(0, 6);
// 	flickerNumber = flickers[flickerNumber];

//     setTimeout(function() {
//             counter = 0;
//             flicker();
//             loop();  
//     }, rand);
// }());