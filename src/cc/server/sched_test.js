define(function(require, exports, module) {
  "use strict";

  var assert = require("chai").assert;
  var cc = require("./cc");
  var fn = require("./fn");
  var register  = require("./installer").register;
  var sched     = require("./sched");
  var Timeline  = sched.Timeline;
  var Task      = sched.TaskInterface;
  var TaskDo    = sched.TaskDo;
  var TaskLoop  = sched.TaskLoop;
  var TaskEach  = sched.TaskEach;
  var TaskTimeout  = sched.TaskTimeout;
  var TaskInterval = sched.TaskInterval;

  var MockServer = (function() {
    function MockServer() {
      this.sampleRate = 44100;
      this.bufLength  = 64;
      this.timeline   = new Timeline(this);
    }
    return MockServer;
  })();

  describe("sched.js", function() {
    var timeline, sync, procN, procT;
    before(function() {
      sched.install(register);
    });
    beforeEach(function() {
      cc.server = new MockServer();
      timeline  = cc.server.timeline;
      procN = function(n) {
        for (var i = 0; i < n; i++) {
          timeline.process();
        }
      };
      procT = function(t) {
        var n = Math.ceil(t / timeline.counterIncr);
        for (var i = 0; i < n; i++) {
          timeline.process();
        }
      };
      timeline.play();
    });
    describe("TaskDo", function() {
      it("create", function() {
        var t = Task.do(function() {});
        assert.instanceOf(t, TaskDo);
      });
      it("sync", function() {
        var passed = 0;
        var t = Task.do(function() {
          passed += 1;
          this.wait(100);
          this.sync(function() {
            passed += 1;
          });
          this.wait(100);
        }).play();
        assert.equal(0, passed);
        procN(1);
        assert.equal(1, passed);
        procT(100);
        assert.equal(2, passed);
        assert.isNotNull(t._timeline);
        procT(100);
        assert.isNull(t._timeline);
      });
      it("pause", function() {
        var passed = 0;
        var t = Task.do(function() {
          passed += 1;
          this.wait(100);
          this.sync(function() {
            passed += 1;
          });
        }).play();
        procT(80);
        assert.equal(1, passed);
        t.pause();
        procT(30);
        assert.equal(1, passed);
        t.play();
        procT(30);
        assert.equal(2, passed);
      });
      it("stop", function() {
        var passed = 0;
        var t = Task.do(function() {
          passed += 1;
          this.wait(100);
          this.sync(function() {
            throw "should not pass through";
          });
        }).play();
        procT(80);
        assert.equal(1, passed);
        t.stop();
        procT(30);
        assert.equal(1, passed);
        t.play();
        procT(30);
        assert.equal(1, passed);
      });
    });
    describe("TaskLoop", function() {
      it("create", function() {
        var t = Task.loop(function() {})
        assert.instanceOf(t, TaskLoop);
      });
      it("sync", function() {
        var passed = 0;
        var t = Task.loop(function() {
          passed += 1;
          this.wait(100);
        }).play();
        assert.equal(0, passed);
        procN(1);
        for (var i = 1; i <= 10; i++) {
          assert.equal(i, passed);
          procT(101);
        }
      });
    });
    describe("TaskEach", function() {
      it("create", function() {
        var t = Task.each([], function() {});
        assert.instanceOf(t, TaskEach);
      });
      it("sync", function() {
        var passed = 0;
        var t = Task.each([1,2,3], function(i) {
          passed += i;
          this.wait(100);
        }).play();
        assert.equal(0, passed);
        procN(1);
        assert.equal(1, passed);
        procT(100);
        assert.equal(3, passed);
        procT(100);
        assert.equal(6, passed);
        assert.isNotNull(t._timeline);
        procT(100);
        assert.isNull(t._timeline);
      });
    });
    describe("TaskTimeout", function() {
      it("create", function() {
        var t = Task.timeout(0, function() {});
        assert.instanceOf(t, TaskTimeout);
      });
      it("sync", function() {
        var passed = 0;
        var t = Task.timeout(10, function(i) {
          passed += 1;
          this.wait(100);
        }).play();
        assert.equal(0, passed);
        procN(1);
        assert.equal(0, passed);
        procT(10);
        assert.equal(1, passed);
        assert.isNotNull(t._timeline);
        procT(100);
        assert.isNull(t._timeline);
      });
    });
    describe("TaskInterval", function() {
      it("create", function() {
        var t = Task.interval(0, function() {});
        assert.instanceOf(t, TaskInterval);
      });
      it("sync", function() {
        var passed = 0;
        var t = Task.interval(10, function(i) {
          passed += 1;
          this.wait(90);
        }).play();
        assert.equal(0, passed);
        procN(1);
        assert.equal(0, passed);
        procT(10);
        for (var i = 1; i <= 8; i++) {
          assert.equal(i, passed);
          procT(100);
        }
      });
    });
    it("nesting", function() {
      var passed = 0;
      var t = Task.do(function() {
        passed = 1;
        this.wait(100);
        var tt = Task.each([2,3], function(i) {
          passed = i;
          this.wait(100);
        }).play();
        this.wait(tt);
        this.sync(function() {
          passed = 4;
        });
      }).play();
      assert.equal(0, passed);
      procN(1);
      assert.equal(1, passed);
      procT(100);
      assert.equal(2, passed);
      procT(100);
      assert.equal(3, passed);
      procT(100);
      assert.equal(4, passed);
    });
  });

});