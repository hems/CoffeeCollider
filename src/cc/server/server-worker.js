define(function(require, exports, module) {
  "use strict";

  var cc = require("./cc");
  var extend = require("../common/extend");
  
  var WorkerSynthServer = (function() {
    function WorkerSynthServer() {
      cc.SynthServer.call(this);
      
      this.sampleRate = C.WORKER_SAMPLERATE;
      this.channels   = C.WORKER_CHANNELS;
      this.strmLength = C.WORKER_STRM_LENGTH;
      this.bufLength  = C.WORKER_BUF_LENGTH;
    }
    extend(WorkerSynthServer, cc.SynthServer);
    
    WorkerSynthServer.prototype.sendToLang = function(msg) {
      postMessage(msg);
    };
    WorkerSynthServer.prototype.connect = function() {
      this.sendToLang([
        "/connected", this.sampleRate, this.channels
      ]);
    };
    WorkerSynthServer.prototype.process = function() {
      if (this.sysSyncCount < this.syncCount - C.STRM_FORWARD_PROCESSING) {
        return;
      }
      var strm = this.strm;
      var instance = this.instance;
      var strmLength = this.strmLength;
      var bufLength  = this.bufLength;
      var busOut  = this.busOut;
      var busOutL = this.busOutL;
      var busOutR = this.busOutR;
      var lang = cc.lang;
      var offset = 0;
      for (var i = 0, imax = strmLength / bufLength; i < imax; ++i) {
        lang.process();
        instance.process(bufLength);
        busOut.set(instance.bus);
        var j = bufLength, k = strmLength + bufLength;
        while (k--, j--) {
          strm[j + offset] = Math.max(-32768, Math.min(busOutL[j] * 32768, 32767));
          strm[k + offset] = Math.max(-32768, Math.min(busOutR[j] * 32768, 32767));
        }
        offset += bufLength;
      }
      this.sendToLang(strm);
      this.syncCount += 1;
    };
    
    return WorkerSynthServer;
  })();
  
  cc.createWorkerSynthServer = function() {
    var server = new WorkerSynthServer();
    cc.opmode = "worker";
    return server;
  };
  
  module.exports = {};

});
