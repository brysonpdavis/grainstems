import * as Tone from 'tone'
import drums from '../stems/drums1.wav'
import React, {useState} from 'react'
import setupTone from '../services/setupTone'
import App from './App'
import Visualizer from './Visualizer'

const AudioContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const {fft, gain, envelope, filter, player} = setupTone({
    onload: () => setIsLoaded(true),
    detune:0,
    url: drums,
    mute: false,
    loop:true,
    reverse: false,
    grainSize:0.5,
    overlap:0.01,
    playbackRate:1,
  })

  let audioObj = {
    isLoaded: isLoaded,

    player: player,
    filter: filter,
    envelope: envelope,
    gain: gain,
    fft: fft,

    // setEnvelopeEnabled: null,
    // envelopeEnabled: null,
    
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

    resetGrainPlayerAndSampleDuration : function(url, setSampleDuration) {
      var newBuffer = new Tone.ToneAudioBuffer(url, () => {
        this.player.buffer = newBuffer 
        this.player.loopStart = 0
        this.player.loopEnd = this.player.buffer.duration
        setSampleDuration(this.player.buffer.duration)
      })
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
        this.player.chain(this.filter, this.gain, this.fft)
      }
      else {
        //enable envelope
        this.filter.disconnect(gain)
        this.player.chain(this.filter, this.envelope, this.gain, this.fft)
      }
      this.setEnvelopeEnabled(!this.envelopeEnabled)
    },

    getFFT : function() {
      return this.fft.getValue()
    }
  };

  let frequencyBandArray = [...Array(128).keys()]

  return (
    <span>
      <App audioObject={audioObj} />
      <Visualizer 
        audioObject={audioObj}  
        frequencyBandArray={frequencyBandArray}
      />
    </span>)

}

export default AudioContainer;
