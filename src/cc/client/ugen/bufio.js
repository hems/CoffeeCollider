define(function(require, exports, module) {
  "use strict";

  var ugen = require("./ugen");
  var AudioBuffer = require("../buffer").AudioBuffer;
  var slice = [].slice;
  
  var playBuf_ctor = function(rate) {
    return function(numChannels, buffer) {
      if (typeof numChannels !== "number") {
        throw new TypeError("Buffer: arguments[0] should be an integer.");
      }
      if (!(buffer instanceof AudioBuffer)) {
        throw new TypeError("Buffer: arguments[1] should be a buffer.");
      }
      numChannels = Math.max(0, numChannels|0);
      this.init.apply(this, [rate].concat(slice.call(arguments, 1)));
      this.specialIndex = buffer._bufId;
      return this.initOutputs(numChannels, this.rate);
    };
  };
  
  var iPlayBuf = {
    ar: {
      defaults: "numChannels=0,buffer,rate=1,trigger=1,startPos=0,loop=0,doneAction=0",
      ctor: playBuf_ctor(C.AUDIO),
      Klass: ugen.MultiOutUGen
    },
    kr: {
      defaults: "numChannels=0,buffer,rate=1,trigger=1,startPos=0,loop=0,doneAction=0",
      ctor: playBuf_ctor(C.CONTROL),
      Klass: ugen.MultiOutUGen
    },
  };

  module.exports = {
    install: function() {
      ugen.register("PlayBuf", iPlayBuf);
    }
  };

});
