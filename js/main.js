System.registerModule("es6/neon.js", [], function() {
  "use strict";
  var __moduleName = "es6/neon.js";
  var Neon = function Neon(iterator) {
    this.iterator = iterator;
  };
  ($traceurRuntime.createClass)(Neon, {getElement: function() {
      return this.iterator.next();
    }}, {});
  return {get Neon() {
      return Neon;
    }};
});
System.registerModule("es6/randomFlicker.js", [], function() {
  "use strict";
  var __moduleName = "es6/randomFlicker.js";
  var RandomFlicker = function RandomFlicker(elements) {
    this.elements = elements;
    this.randomGenerator = this.random();
  };
  ($traceurRuntime.createClass)(RandomFlicker, {
    random: $traceurRuntime.initGeneratorFunction(function $__1() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = (true) ? 5 : -2;
              break;
            case 5:
              console.log(this.elements[Math.floor(Math.random() * this.elements.length)]);
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return this.elements[Math.floor(Math.random() * this.elements.length)];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 0;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    }),
    getElement: function() {
      return this.randomGenerator.next();
    }
  }, {});
  return {get RandomFlicker() {
      return RandomFlicker;
    }};
});
System.registerModule("es6/main.js", [], function() {
  "use strict";
  var __moduleName = "es6/main.js";
  var Neon = System.get("es6/neon.js").Neon;
  var RandomFlicker = System.get("es6/randomFlicker.js").RandomFlicker;
  var neonWords = [['N', 'E', 'O', 'N1'], ['L', 'O1', 'U', 'N2', 'G', 'E1']];
  var randomFlicker = new RandomFlicker(neonWords[0].concat(neonWords[1]));
  function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    var animIterationEventNames = {
      "WebkitAnimation": "webkitAnimationIteration",
      "MozAnimation": "animationiteration",
      "OAnimation": "oAnimationIteration",
      "msAnimation": "MSAnimationIteration",
      "animation": "animationiteration"
    };
    var animEndEventNames = {
      "WebkitAnimation": "webkitAnimationEnd",
      "MozAnimation": "animationend",
      "OAnimation": "oAnimationend",
      "msAnimation": "MSAnimationEnd",
      "animation": "animationend"
    };
    for (t in animEndEventNames) {
      if (el.style[t] !== undefined) {
        return animEndEventNames[t];
      }
    }
  }
  var transitionEvent = whichTransitionEvent();
  var e = document.getElementById('G');
  transitionEvent && e.addEventListener(transitionEvent, function() {
    console.log('Transition complete!  This is the callback, no library needed!');
  });
  return {};
});
System.get("es6/main.js" + '');
