console.log("neon.js loaded");


$("#O").find("[id^='end']").each(function(){
	console.log(this.id);
	$("#" + this.id).attr("class","tube");
});