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
			hideMenu();
			$("#settings-icon").attr("class","settings-icon-closed");
		} else {
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
		$("#settings-icon").attr("class","settings-icon-closed");	
	}

	/* hide active menu if mask is clicked */
	mask.addEventListener( "click", hideMenu);
})( window );