System.registerModule("es6/neon.js", [], function() {
  "use strict";
  var __moduleName = "es6/neon.js";
  var Neon = function Neon() {
    this.colourIterator = this.colours();
    this.letterSequenceIterator = this.letterSequence();
    this.sequenceCounter = 0;
    this.flickerInterval = 6;
    this.flickerEvent = this.getRandomInt(3, this.flickerInterval);
    this.colour = this.getNextColour();
    this.sequencers;
    this.sequencer;
    this.iterableSequencers = new Array();
    this.rows;
    this.lastSequence = [];
  };
  var $Neon = Neon;
  ($traceurRuntime.createClass)(Neon, {
    setup: function(rows) {
      this.rows = rows;
      this.addSequencer(this.firstRowForwardsLastRowBackwards);
      this.addSequencer(this.shuffle);
      this.addSequencer(this.zigzag);
      this.initSequencers();
      this.initSequencer();
    },
    addSequencer: function(callback) {
      this.iterableSequencers.push(callback);
    },
    initSequencer: function() {
      var sequencer = this.sequencers.next();
      if (sequencer.done) {
        console.log('restart initSequencer');
        this.initSequencers();
        sequencer = this.sequencers.next();
      }
      this.sequencer = this.iterator(sequencer.value(this.rows));
    },
    initSequencers: function(sequencers) {
      this.sequencers = this.iterator(this.iterableSequencers);
    },
    animateSequences: function() {
      var sequence = this.sequencer.next();
      if (sequence.done) {
        this.initSequencer();
        sequence = this.sequencer.next();
        sequence.startSequence = true;
      }
      return sequence;
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
      console.log("called fisrt row longest");
      return $Neon.mergeArrays([rows[0], (rows[1].slice()).reverse()]);
    },
    zigzag: function(rows) {
      console.log("called zig zag flat");
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
    colours: $traceurRuntime.initGeneratorFunction(function $__4() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = 2;
              return 'rgb(255,183,10)';
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              $ctx.state = 6;
              return 'rgb(25,110,238)';
            case 6:
              $ctx.maybeThrow();
              $ctx.state = 8;
              break;
            case 8:
              $ctx.state = 10;
              return 'rgb(6,162,95)';
            case 10:
              $ctx.maybeThrow();
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = 14;
              return 'rgb(200,30,80)';
            case 14:
              $ctx.maybeThrow();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__4, this);
    }),
    getNextColour: function() {
      var colour = this.colourIterator.next();
      if (colour.done) {
        this.colourIterator = this.colours();
        colour = this.colourIterator.next();
      }
      return colour;
    },
    letterSequence: $traceurRuntime.initGeneratorFunction(function $__5() {
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = 2;
              return ['N', 'E1'];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              $ctx.state = 6;
              return ['E', 'G'];
            case 6:
              $ctx.maybeThrow();
              $ctx.state = 8;
              break;
            case 8:
              $ctx.state = 10;
              return ['O', 'N2'];
            case 10:
              $ctx.maybeThrow();
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = 14;
              return ['N1', 'U'];
            case 14:
              $ctx.maybeThrow();
              $ctx.state = 16;
              break;
            case 16:
              $ctx.state = 18;
              return ['O1'];
            case 18:
              $ctx.maybeThrow();
              $ctx.state = 20;
              break;
            case 20:
              $ctx.state = 22;
              return ['L'];
            case 22:
              $ctx.maybeThrow();
              $ctx.state = 24;
              break;
            case 24:
              $ctx.state = 26;
              return undefined;
            case 26:
              $ctx.maybeThrow();
              $ctx.state = 28;
              break;
            case 28:
              $ctx.state = 30;
              return ['N'];
            case 30:
              $ctx.maybeThrow();
              $ctx.state = 32;
              break;
            case 32:
              $ctx.state = 34;
              return ['L'];
            case 34:
              $ctx.maybeThrow();
              $ctx.state = 36;
              break;
            case 36:
              $ctx.state = 38;
              return ['O1'];
            case 38:
              $ctx.maybeThrow();
              $ctx.state = 40;
              break;
            case 40:
              $ctx.state = 42;
              return ['E'];
            case 42:
              $ctx.maybeThrow();
              $ctx.state = 44;
              break;
            case 44:
              $ctx.state = 46;
              return ['O'];
            case 46:
              $ctx.maybeThrow();
              $ctx.state = 48;
              break;
            case 48:
              $ctx.state = 50;
              return ['U'];
            case 50:
              $ctx.maybeThrow();
              $ctx.state = 52;
              break;
            case 52:
              $ctx.state = 54;
              return ['N1'];
            case 54:
              $ctx.maybeThrow();
              $ctx.state = 56;
              break;
            case 56:
              $ctx.state = 58;
              return ['N2'];
            case 58:
              $ctx.maybeThrow();
              $ctx.state = 60;
              break;
            case 60:
              $ctx.state = 62;
              return ['G'];
            case 62:
              $ctx.maybeThrow();
              $ctx.state = 64;
              break;
            case 64:
              $ctx.state = 66;
              return ['E1'];
            case 66:
              $ctx.maybeThrow();
              $ctx.state = 68;
              break;
            case 68:
              $ctx.state = 70;
              return undefined;
            case 70:
              $ctx.maybeThrow();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__5, this);
    }),
    getNextLetterSquence: function() {
      var letterSequence = this.letterSequenceIterator.next();
      if (letterSequence.done) {
        this.letterSequenceIterator = this.letterSequence();
      }
      return letterSequence;
    },
    animate: function() {
      var instructions = {};
      this.sequenceCounter++;
      var sequence = this.getNextLetterSquence();
      if (!sequence.value) {
        console.log("getting next colour value new");
        this.colour = this.getNextColour();
        sequence = this.getNextLetterSquence();
        this.sequenceCounter = 0;
      }
      if (this.sequenceCounter == this.flickerEvent) {
        instructions["flicker"] = true;
        this.flickerEvent = this.getRandomInt(3, this.flickerInterval);
        console.log(("doing a new flicker event " + this.flickerEvent));
      }
      instructions["colour"] = this.colour.value;
      instructions["letterSequence"] = sequence.value;
      return instructions;
    },
    wrapIntoArray: function(value) {
      return (value.constructor === Array) ? value : [value];
    },
    animate1: function() {
      var instructions = {};
      this.sequenceCounter++;
      var sequence = this.sequencer.next();
      if (sequence.done) {
        this.initSequencer();
        sequence.startSequence = true;
        sequence.value = [];
        this.colour = this.getNextColour();
        this.sequenceCounter = 0;
      } else {
        this.lastSequence = this.wrapIntoArray(sequence.value);
      }
      if (this.sequenceCounter == this.flickerEvent) {
        instructions["flicker"] = true;
        this.flickerEvent = this.getRandomInt(3, this.flickerInterval);
        console.log(("doing a new flicker event " + this.flickerEvent));
      }
      instructions["colour"] = this.colour.value;
      instructions["letterSequence"] = this.wrapIntoArray(sequence.value);
      instructions["startSequence"] = sequence.startSequence;
      return instructions;
    },
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    getBiggestArray: function(rows) {
      return (rows[0].length > rows[1].length) ? rows[0] : rows[1];
    },
    arraysEqual: function(arr1, arr2) {
      if (arr1.length !== arr2.length)
        return false;
      for (var i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i])
          return false;
      }
      return true;
    },
    mergeArrays: function(arrays) {
      var flat = arguments[1] !== (void 0) ? arguments[1] : false;
      var biggerArray = $Neon.getBiggestArray(arrays);
      var smallerArray = $Neon.arraysEqual(arrays[0], biggerArray) ? arrays[1] : arrays[0];
      var merged = new Array();
      for (var i = 0; i < biggerArray.length; i++) {
        var temp = (flat) ? merged : new Array();
        temp.push(biggerArray[i]);
        if (smallerArray[i]) {
          temp.push(smallerArray[i]);
        }
        if (!flat) {
          merged.push(temp);
        }
      }
      return merged;
    }
  });
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
              $ctx.state = (true) ? 1 : -2;
              break;
            case 1:
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
    },
    getDifferentElement: function(element) {
      var elementIndex = this.elements.indexOf(element);
      if (elementIndex == 0 || elementIndex == this.elements.length - 1) {
        return {
          value: this.elements[1],
          done: false
        };
      } else {
        return {
          value: this.elements[--elementIndex],
          done: false
        };
      }
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
  var neon = new Neon();
  neon.setup([['N', 'E', 'O', 'N1'], ['L', 'O1', 'U', 'N2', 'G', 'E1']]);
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
  $("#neon g").on(transitionEvent, function(e) {
    $("#neon g").attr("class", "");
    var animate = neon.animate1();
    console.log(animate);
    var el = $("#" + e.target.id);
    el.before(el.clone(true)).remove();
    if (animate.startSequence) {
      console.log("start seq delayLong");
      $("#" + e.target.id).attr("class", "delayLong");
    } else {
      for (var $__2 = animate.letterSequence.values()[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3 = void 0; !($__3 = $__2.next()).done; ) {
        var elem = $__3.value;
        {
          console.log(("elem: " + elem));
          $("#" + elem).attr("stroke", animate.colour);
        }
      }
      $("#" + e.target.id).attr("class", "delay");
    }
  });
  return {};
});
System.get("es6/main.js" + '');
