---
layout: default
#title: Word Animation
permalink: /word-animation/
---
<p> proff of concept for quote animation</p>
<div id="container"></div>
<div id="floating-words"></div>
<br/><br/>
<button id="do">click</button>

<script type="text/javascript"> 
var phrases = [
	{
		id:"pr1",
		tokens: ["The", "trees", "are", "blooming", "in", "the", "courtyard"],
		map: [[1,0],[4,1],[3,5]]
	},
	{
		id:"pr2",
		tokens: ["Trees", "in", "summer", "stop", "all", "blooming"],
		map: [[0,1],[1,4],[5,3]]
	}
];

var placeTokens = function(phrase,cssClass) {
	for(var i= 0; i < phrase.tokens.length; i++){
		var token = phrase.tokens[i];
		var id = "-" + phrase.id;
		$("#container").append("<span id='" + token + id + "' class='" + cssClass + "'>" + token + "</span>");
	}
}

placeTokens(phrases[0],"word");

var wordsDone = 0;
var complete = function () {
	wordsDone++;
	if(wordsDone === phrases[currentPhrase].map.length) {		
		wordsDone = 0; // reset counter
		// - fade in the words new phrase words using animation
		$("#container").children().attr("class","word");
		// - remove the absolute elements.
		$("#floating-words").empty();
	}
}

var currentPhrase = 0;

$("#do").click(function(){
		// - create absolute elements on top of the matching words
		var oldPhrase = phrases[currentPhrase];
		var newPhrase = phrases[1];
		for( var i= 0; i < newPhrase.map.length; i++){
			var wordMatch = newPhrase.map[i];
			var oldWord = oldPhrase.tokens[wordMatch[1]];
			// get the current matched element
			var currentElement = oldWord + "-" + oldPhrase.id;
			// get the position of the element matching from the current word
			var offset = $("#" +currentElement).offset();
			// hack! position is always 4 pixes down from original
			offset.top = offset.top -4;			
			var newWord = newPhrase.tokens[wordMatch[0]];
			var idSuffix = "-float";
			var newWordId = newWord + "-" + newPhrase.id + idSuffix;
			$("#floating-words").append("<div class='floating' id='" + newWordId  + "'>" + oldWord + "</div>");
			//position the floating words upon their matched counterparts
			$("#" + newWordId).offset(offset);		
		}
		// - fade and then remove all the current words
		$("#container").empty();
		// - append all new words in a hidden fashion
		placeTokens(phrases[1],"hidden-word");
		// - transition each matching word to its new position in the new phrase
		$("#floating-words").children().each(function(){
			var idSuffix = "-float";
			var id = this.id.replace(idSuffix,"");			
			var offset = $("#" + id).offset();
			// hack! position is always 4 pixes down from original
			offset.top = offset.top -4;	
			$(this).animate(offset,800,"swing",complete);
		});
});
</script>