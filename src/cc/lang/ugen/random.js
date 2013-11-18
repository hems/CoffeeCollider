define(function(require, exports, module) {
  "use strict";

  var cc = require("../cc");

  cc.ugen.specs.Rand = {
    $new: {
      defaults: "lo=0,hi=1",
      ctor: function(lo, hi) {
        return this.init(C.SCALAR, lo, hi);
      }
    }
  };

  cc.ugen.specs.IRand = {
    $new: {
      defaults: "lo=0,hi=127",
      ctor: function(lo, hi) {
        return this.init(C.SCALAR, lo, hi);
      }
    }
  };

  cc.ugen.specs.TRand = {
    $ar: {
      defaults: "lo=0,hi=1,trig=1",
      ctor: function(lo, hi, trig) {
        return this.init(C.AUDIO, lo, hi, trig);
      }
    },
    $kr: {
      defaults: "lo=0,hi=1,trig=1",
      ctor: function(lo, hi, trig) {
        return this.init(C.CONTROL, lo, hi, trig);
      }
    }
  };
  
  cc.ugen.specs.TIRand = {
    $ar: {
      defaults: "lo=0,hi=127,trig=1",
      ctor: function(lo, hi, trig) {
        return this.init(C.AUDIO, lo, hi, trig);
      }
    },
    $kr: {
      defaults: "lo=0,hi=127,trig=1",
      ctor: function(lo, hi, trig) {
        return this.init(C.CONTROL, lo, hi, trig);
      }
    }
  };

  cc.ugen.specs.LinRand = {
    $new: {
      defaults: "lo=0,hi=1,minmax=0",
      ctor: function(lo, hi, minmax) {
        return this.init(C.SCALAR, lo, hi, minmax);
      }
    }
  };

  cc.ugen.specs.NRand = {
    $new: {
      defaults: "lo=0,hi=1,n=0",
      ctor: function(lo, hi, n) {
        return this.init(C.SCALAR, lo, hi, n);
      }
    }
  };

  cc.ugen.specs.ExpRand = {
    $new: {
      defaults: "lo=0.01,hi=1",
      ctor: function(lo, hi) {
        return this.init(C.SCALAR, lo, hi);
      }
    }
  };

  cc.ugen.specs.TExpRand = {
    $ar: {
      defaults: "lo=0.01,hi=1,trig=1",
      ctor: function(lo, hi, trig) {
        return this.init(C.AUDIO, lo, hi, trig);
      }
    },
    $kr: {
      defaults: "lo=0.01,hi=1,trig=1",
      ctor: function(lo, hi, trig) {
        return this.init(C.CONTROL, lo, hi, trig);
      }
    }
  };
  
  module.exports = {};

});