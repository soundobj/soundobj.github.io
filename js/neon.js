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
  return {get Neon() {
      return Neon;
    }};
});
System.get("es6/neon.js" + '');
