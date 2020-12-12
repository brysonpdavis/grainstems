import * as Tone from 'tone'
import piano1 from '../stems/piano1.wav'
import React, {useState} from 'react'
import setupNodes from '../services/setupNodes'
import App from './App'

const AudioContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const {gain, envelope, filter, player} = setupNodes({
    onload: () => setIsLoaded(true),
    detune:0,
    url: piano1,
    mute: false,
    loop:true,
    reverse: true,
    grainSize:0.05,
    overlap:0.01,
    playbackRate:1,
  })

  let audioObj = {
    isLoaded: isLoaded,

    player: player,
    filter: filter,
    envelope: envelope,
    gain: gain,

    setEnvelopeEnabled: null,
    envelopeEnabled: null,
    
    startPlayer : function() {
      Tone.context.resume()
      this.player.start(Tone.now())
    },

    stopPlayer : function() {
      this.player.stop("+0.1")
    },

    tuneUp : function() {
      this.player.detune = this.player.detune + 100
    },

    tuneDown : function() {
      this.player.detune = this.player.detune - 100
    },

    setReverse : function() {
      this.player.reverse = !this.player.reverse
    },

    sampleSpeedDown : function() {
      if (this.player.playbackRate > 0.5)
        {this.player.playbackRate = this.player.playbackRate - 0.5}
    },

    sampleSpeedUp : function() {
      this.player.playbackRate = this.player.playbackRate + 0.5
    },

    resetGrainPlayer : function(url) {
      var newBuffer = new Tone.ToneAudioBuffer(url, () => this.player.buffer = newBuffer)
    },

    playA : function() {
      this.player.detune = 0
      this.envelope.triggerAttackRelease("8n")
    },
    playB : function() {
      this.player.detune = 200
      this.envelope.triggerAttackRelease("8n")
    },
    playC : function() {
      this.player.detune = 400
      this.envelope.triggerAttackRelease("8n")
    },
    playD : function() {
      this.player.detune = 500
      this.envelope.triggerAttackRelease("8n")
    },
    playE : function() {
      this.player.detune = 700
      this.envelope.triggerAttackRelease("8n")
    },
    playF : function() {
      this.player.detune = 900
      this.envelope.triggerAttackRelease("8n")
    },
    playG : function() {
      this.player.detune = 1100
      this.envelope.triggerAttackRelease("8n")
    },

    toggleEnvelope : function() {
      if (this.envelopeEnabled) {
        //disable envelope
        this.filter.disconnect(this.envelope, 0, 0)
        this.envelope.disconnect(this.gain, 0, 0)
        this.player.chain(this.filter, this.gain)
      }
      else {
        //enable envelope
        this.filter.disconnect(gain)
        this.player.chain(this.filter, this.envelope, this.gain)
      }
      this.setEnvelopeEnabled(!this.envelopeEnabled)
    }
  };

  return <span><App audioObject={audioObj} /></span>

}

export default AudioContainer;
