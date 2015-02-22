System.registerModule("es6/neon.js", [], function() {
  "use strict";
  var __moduleName = "es6/neon.js";
  var Neon = function Neon(elements) {
    var mode = arguments[1] !== (void 0) ? arguments[1] : 'RANDOM-FLICKER';
    this.elements = elements;
    this.mode = mode;
    this.prepareElements(this.mode);
    this.iterableElements;
    this.iterator;
  };
  ($traceurRuntime.createClass)(Neon, {
    prepareElements: function() {
      var mode = arguments[0] !== (void 0) ? arguments[0] : null;
      this.iterableElements = this.elements[0].concat(this.elements[1]);
      this.iterator = this.random();
    },
    switchMode: function(mode) {},
    animate: function(element) {},
    sayHi: function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : 'Anonymous';
      console.log(("Hi neon 7 " + name + "!"));
      console.log(this.elements);
      return (("Hi neon 7 " + name + "!"));
    },
    value: function() {
      return 'works';
    },
    getElement: function() {
      console.log(this.mode);
      return this.iterator.next();
    },
    random: $traceurRuntime.initGeneratorFunction(function $__1() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              console.log("call random");
              console.log(this.iterableElements[Math.floor(Math.random() * this.iterableElements.length)]);
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return this.iterableElements[Math.floor(Math.random() * this.iterableElements.length)];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    })
  }, {});
  return {get Neon() {
      return Neon;
    }};
});
System.get("es6/neon.js" + '');
