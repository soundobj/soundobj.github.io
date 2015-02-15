"use strict";
Object.defineProperties(module.exports, {
  Some: {get: function() {
      return Some;
    }},
  __esModule: {value: true}
});
var Some = function Some() {};
($traceurRuntime.createClass)(Some, {
  method: function() {
    return this.value();
  },
  value: function() {
    return 'works';
  }
}, {});
