System.registerModule("es6/neon.js", [], function() {
  "use strict";
  var __moduleName = "es6/neon.js";
  var Neon = function Neon() {};
  ($traceurRuntime.createClass)(Neon, {sayHi: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : 'Anonymous';
      console.log(("Hi neon " + name + "!"));
    }}, {});
  var neon = new Neon();
  neon.sayHi();
  return {};
});
System.get("es6/neon.js" + '');
