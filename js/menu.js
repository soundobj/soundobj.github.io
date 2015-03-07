/**
 * The nav stuff
 */
(function( window ){
	
	'use strict';
	var	mask = document.createElement("div");
	mask.className = "mask";
	var	toggleSlideLeft = document.querySelector( ".menu-icon" );
	var	activeNav;
	
	/* slide menu left */
	toggleSlideLeft.addEventListener( "click", function(){
		console.log("click lieft 6");
		$("body").addClass("sml-open");		
		document.body.appendChild(mask);
		activeNav = "sml-open";
		$("#settings-icon").toggleClass("settings-icon-closed settings-icon-open");
	} );

	/* hide active menu if mask is clicked */
	mask.addEventListener( "click", function(){
		$("body").removeClass(activeNav);
		activeNav = "";
		document.body.removeChild(mask);		
	} );
})( window );