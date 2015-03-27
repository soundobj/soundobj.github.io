System.registerModule("es6/neon.js", [], function() {
  "use strict";
  var __moduleName = "es6/neon.js";
  var Neon = function Neon() {
    this.colourIterator = undefined;
    this.colours = undefined;
    this.colour = undefined;
    this.sequencers = undefined;
    this.sequencer = undefined;
    this.iterableSequencers = [];
    this.rows = undefined;
  };
  var $Neon = Neon;
  ($traceurRuntime.createClass)(Neon, {
    setup: function(rows, colours) {
      this.rows = rows;
      this.addSequencer(this.firstRowForwardsLastRowBackwards);
      this.addSequencer(this.shuffle);
      this.addSequencer(this.zigzag);
      this.initSequencers();
      this.initSequencer();
      this.colours = colours;
      this.colourIterator = this.iterator(this.colours);
      this.colour = this.getNextColour();
    },
    addSequencer: function(callback) {
      this.iterableSequencers.push(callback);
    },
    initSequencer: function() {
      var sequencer = this.sequencers.next();
      if (sequencer.done) {
        this.initSequencers();
        sequencer = this.sequencers.next();
      }
      this.sequencer = this.iterator(sequencer.value(this.rows));
    },
    initSequencers: function() {
      this.sequencers = this.iterator(this.iterableSequencers);
    },
    iterator: $traceurRuntime.initGeneratorFunction(function $__3(elements) {
      var $__1,
          $__2,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__1 = elements.values()[$traceurRuntime.toProperty(Symbol.iterator)](), $__2 = void 0;
              $ctx.state = 4;
              break;
            case 4:
              $ctx.state = (!($__2 = $__1.next()).done) ? 5 : -2;
              break;
            case 5:
              value = $__2.value;
              $ctx.state = 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__3, this);
    }),
    firstRowForwardsLastRowBackwards: function(rows) {
      return $Neon.mergeArrays([rows[0], (rows[1].slice()).reverse()]);
    },
    zigzag: function(rows) {
      return $Neon.mergeArrays([rows[0], rows[1]], true);
    },
    shuffle: function(rows) {
      var array = rows[0].concat(rows[1]);
      var currentIndex = array.length,
          temporaryValue,
          randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    getNextColour: function() {
      var colour = this.colourIterator.next();
      if (colour.done) {
        this.colourIterator = this.iterator(this.colours);
        colour = this.colourIterator.next();
      }
      return colour;
    },
    animate: function() {
      var instructions = {};
      var sequence = this.sequencer.next();
      if (sequence.done) {
        this.initSequencer();
        sequence.startSequence = true;
        sequence.value = [];
        this.colour = this.getNextColour();
      }
      instructions.colour = this.colour.value;
      instructions.letterSequence = $Neon.wrapIntoArray(sequence.value);
      instructions.startSequence = sequence.startSequence;
      return instructions;
    }
  }, {
    getBiggestArray: function(arrays) {
      return (arrays[0].length > arrays[1].length) ? arrays[0] : arrays[1];
    },
    arraysEqual: function(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (var i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    },
    mergeArrays: function(arrays) {
      var flat = arguments[1] !== (void 0) ? arguments[1] : false;
      var biggerArray = $Neon.getBiggestArray(arrays);
      var smallerArray = $Neon.arraysEqual(arrays[0], biggerArray) ? arrays[1] : arrays[0];
      var merged = [];
      for (var i = 0; i < biggerArray.length; i++) {
        var temp = (flat) ? merged : [];
        temp.push(biggerArray[i]);
        if (smallerArray[i]) {
          temp.push(smallerArray[i]);
        }
        if (!flat) {
          merged.push(temp);
        }
      }
      return merged;
    },
    wrapIntoArray: function(value) {
      return (value.constructor === Array) ? value : [value];
    }
  });
  return {get Neon() {
      return Neon;
    }};
});
System.registerModule("es6/main.js", [], function() {
  "use strict";
  var __moduleName = "es6/main.js";
  var Neon = System.get("es6/neon.js").Neon;
  var neon = new Neon();
  neon.setup([['N', 'E', 'O', 'N1'], ['L', 'O1', 'U', 'N2', 'G', 'E1']], ['rgb(255,183,10)', 'rgb(25,110,238)', 'rgb(6,162,95)', 'rgb(200,30,80)']);
  function whichAnimationEndEvent() {
    var t;
    var el = document.createElement('fakeelement');
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
  var animationEndEvent = whichAnimationEndEvent();
  $("#neon g").on(animationEndEvent, function(e) {
    $("#neon g").attr("class", "");
    var animate = neon.animate();
    var el = $("#" + e.target.id);
    el.before(el.clone(true)).remove();
    if (animate.startSequence) {
      $("#" + e.target.id).attr("class", "delayLong");
    } else {
      for (var $__1 = animate.letterSequence.values()[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__2 = void 0; !($__2 = $__1.next()).done; ) {
        var elem = $__2.value;
        {
          $("#" + elem).attr("stroke", animate.colour);
        }
      }
      $("#" + e.target.id).attr("class", "delay");
    }
  });
  return {};
});
System.get("es6/main.js" + '');
