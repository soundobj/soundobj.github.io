System.registerModule("es6/neon.js", [], function() {
  "use strict";
  var __moduleName = "es6/neon.js";
  var Neon = function Neon(elements) {
    this.elements = elements;
  };
  ($traceurRuntime.createClass)(Neon, {
    sayHi: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : 'Anonymous';
      console.log(("Hi neon 7 " + name + "!"));
      console.log(this.elements);
      return (("Hi neon 7 " + name + "!"));
    },
    value: function() {
      return 'works';
    }
  }, {});
  var neon = new Neon([['N', 'E', 'O', 'N1'], ['L', 'O1', 'U', 'N2', 'G', 'E1']]);
  neon.sayHi();
  $("g[id='G']").find("[id^='tube']").each(function() {
    var originalColour = $('#' + this.id).attr('fill');
    console.log(originalColour);
    $('#' + this.id).attr('fill', 'url(#upper)');
    document.getElementById("animate1").setAttribute("to", originalColour);
    document.getElementById("animate0").beginElement();
  });
  ;
  console.log("done apply fill");
  return {get Neon() {
      return Neon;
    }};
});
System.get("es6/neon.js" + '');
