"use strict";
var Neon = function Neon() {};
($traceurRuntime.createClass)(Neon, {sayHi: function() {
    var name = arguments[0] !== (void 0) ? arguments[0] : 'Anonymous';
    console.log(("Hi neon 5 " + name + "!"));
  }}, {});
var neon = new Neon();
neon.sayHi();
