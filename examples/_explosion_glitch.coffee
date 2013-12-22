# it takes a little while to load after you press "Run"

buffer = Buffer.read("/genesis/sound/genesis/explosion.mp3")
  
(->
  trig  = Dust.kr(2)
  start = TIRand.kr(0, BufFrames.kr(buffer), trig)
  end   = start + TIRand.kr(500, 50000, trig)
  rate  = TRand.kr(-2, 2, trig)
  phase = Phasor.ar(K2A.ar(trig), rate:rate, start:start, end:end)
  FreeVerb.ar(BufRd.ar(2, buffer, phase), room:0.8)
).play()
