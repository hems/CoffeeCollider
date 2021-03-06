define(function(require, exports, module) {
  "use strict";

  var cc = require("../cc");
  
  var Unit = (function() {
    function Unit(parent, specs) {
      this.parent = parent;
      this.specs  = specs;
      this.name         = specs[0];
      this.calcRate     = specs[1];
      this.specialIndex = specs[2];
      this.numOfInputs  = specs[3].length >> 1;
      this.numOfOutputs = specs[4].length;
      this.inputs    = new Array(this.numOfInputs);
      this.inRates   = new Array(this.numOfInputs);
      this.fromUnits = new Array(this.numOfInputs);
      this.outRates = specs[4];
      this.rate     = cc.server.rates[this.calcRate];
      var bufLength = this.rate.bufLength;
      var allOutputs = new Float32Array(bufLength * this.numOfOutputs);
      var outputs    = new Array(this.numOfOutputs);
      for (var i = 0, imax = outputs.length; i < imax; ++i) {
        outputs[i] = new Float32Array(
          allOutputs.buffer,
          bufLength * i * allOutputs.BYTES_PER_ELEMENT,
          bufLength
        );
      }
      this.outputs    = outputs;
      this.allOutputs = allOutputs;
      this.bufLength  = bufLength;
      this.done       = false;
    }
    Unit.prototype.init = function() {
      var ctor = cc.unit.specs[this.name];
      if (typeof ctor === "function") {
        ctor.call(this);
      } else {
        throw new Error(this.name + "'s ctor is not found.");
      }
      return this;
    };
    Unit.prototype.doneAction = function(action) {
      this.parent.doneAction(action);
    };
    return Unit;
  })();
  
  cc.createUnit = function(parent, specs) {
    return new Unit(parent, specs);
  };
  
  module.exports = {
    Unit : Unit
  };

});
