/**
 * The nav stuff
 */
(function( window ){
	
	'use strict';
	var	mask = document.createElement("div");
	mask.className = "mask";
	var	activeNav;

	$(".menu-icon").click(function(){
		if($(".mask").length) {
			console.log("got to close");
			hideMenu();
			$("#settings-icon").attr("class","settings-icon-closed");
		} else {
			console.log("got to open");
			$("body").addClass("sml-open");		
			document.body.appendChild(mask);
			activeNav = "sml-open";
			$("#settings-icon").attr("class","settings-icon-open");
		}
	});

	function hideMenu(){
		$("body").removeClass(activeNav);
		activeNav = "";
		document.body.removeChild(mask);		
	}

	/* hide active menu if mask is clicked */
	mask.addEventListener( "click", hideMenu);
})( window );