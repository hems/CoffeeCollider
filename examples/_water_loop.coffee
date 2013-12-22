# it takes a little while to load after you press "Run"

buffer = Buffer.read("/genesis/sound/genesis/underwater1.mp3")
  
(->
	PlayBuf.ar
		numChannels: 2
		bufnum: buffer.bufnum
		rate:1
		trigger:1
		startPos:0
		loop:1
		doneAction: ->
			console.log "done action"
).play()
