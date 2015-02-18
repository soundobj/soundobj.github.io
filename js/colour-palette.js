System.registerModule("es6/colour-palette.js", [], function() {
  "use strict";
  var __moduleName = "es6/colour-palette.js";
  var ColourPalette = function ColourPalette() {};
  var $ColourPalette = ColourPalette;
  ($traceurRuntime.createClass)(ColourPalette, {}, {
    rgbColourSequence: function(redFreq, redPhase, greenFreq, greenPhase, blueFreq, bluePhase) {
      var center = arguments[6] !== (void 0) ? arguments[6] : 128;
      var width = arguments[7] !== (void 0) ? arguments[7] : 127;
      var paletteSize = arguments[8] !== (void 0) ? arguments[8] : 50;
      var colours = new Array();
      for (var i = 0; i < paletteSize; ++i) {
        colours.push([Math.sin(redFreq * i + redPhase) * width + center, Math.sin(greenFreq * i + greenPhase) * width + center, Math.sin(blueFreq * i + bluePhase) * width + center]);
      }
      return colours;
    },
    RGB2Colour: function(r, g, b) {
      return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
    },
    sampleColours: function(colours, DOMParent) {
      Array.from(colours).forEach(function(el) {
        $(DOMParent).append("<font color=" + $ColourPalette.RGB2Colour(el[0], el[1], el[2]) + ">&#9608;</font>");
      });
    }
  });
  var steps = 6;
  var freq = 2 * Math.PI / steps;
  var repeatCycles = ColourPalette.rgbColourSequence(freq, freq, freq, 0, 2, 4, 128, 127, steps);
  ColourPalette.sampleColours(repeatCycles, "#palettes");
  return {get ColourPalette() {
      return ColourPalette;
    }};
});
System.get("es6/colour-palette.js" + '');
