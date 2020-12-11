import * as Tone from 'tone';
import piano from './stems/piano3.wav'
import React, {useState} from 'react'
import * as skins from 'react-rotary-knob-skin-pack'
import LimitedKnob from './LimitedKnob'

function App() {
  const[isLoaded, setIsLoaded] = useState(false)

  const filter = new Tone.Filter((2 ** 15), "lowpass", -24).toDestination()

  const player = new Tone.GrainPlayer({
    onload: () => setIsLoaded(true),
    detune:0,
    url: piano,
    mute: false,
    loop:true,
    reverse: true,
    grainSize:0.05,
    overlap:0.01,
    playbackRate:1,
  }).connect(filter)
  
  const startPlayer = () => {
    Tone.context.resume()
    player.start(Tone.now())
  }

  const stopPlayer = () => {
    player.stop("+0.1")
  }

  const tuneUp = () => {
    player.detune = player.detune + 100
  }

  const tuneDown = () => {
    player.detune = player.detune - 100
  }

  const setReverse = () => {
    player.reverse = !player.reverse
  }

  const sampleSpeedDown = () => {
    console.log(player.playbackRate)
    if (player.playbackRate > 0.5)
      {player.playbackRate = player.playbackRate - 0.5}
  }

  const sampleSpeedUp = () => {
    player.playbackRate = player.playbackRate + 0.5
  }

  return (
    <div font-family="helvetica">
      <h2>Grainstems</h2>
      <h3>toy granular synth</h3>
      <button disabled={!isLoaded} onClick={startPlayer}>start</button>
      <button onClick={stopPlayer}>stop</button>
      <br />
      <h3>tuning</h3>
      <button onClick={tuneDown}>down</button>
      <button onClick={tuneUp}>up</button>
      <br />
      <h3>sample speed</h3>
      <button onClick={sampleSpeedDown}>down</button>
      <button onClick={sampleSpeedUp}>up</button>
      <br />
      <br />
      <h3>reverse</h3>
      <button onClick={setReverse} >~</button>
      <h3>grain size</h3>
      <LimitedKnob 
        skin={skins.s12}
        change={{change: (v) => {player.grainSize = v / 20}}}
        style = {{width: 100, height: 100}}  
        startval = {10}
        min={1}
        max={20}
        maxDistance={4}
        unlockDistance={100}
        preciseMode={false}       
        rotateDegrees={180}
      />
      <h3>overlap</h3>
      <LimitedKnob 
        skin={skins.s12}
        change={{change: (v) => {player.overlap = player.grainSize * v / 10}}}
        style = {{width: 100, height: 100}}  
        startval = {1}
        min={1}
        max={10}
        maxDistance={3}
        unlockDistance={100}
        preciseMode={false}       
        rotateDegrees={180}
      />
      <h3>tuning</h3>
      <LimitedKnob 
        skin={skins.s12}
        change={{change: (v) => {player.detune = v}}}
        style = {{width: 100, height: 100}}  
        startval={0}
        min={-3600}
        max={3600}
        maxDistance={600}
        unlockDistance={100}
        preciseMode={false}       
        rotateDegrees={180}
      />
      <h3>filter cutoff</h3>
      <LimitedKnob 
        skin={skins.s12}
        change={{change: (v) => {filter.frequency.rampTo(2 ** (v + 5))}}}
        style = {{width: 100, height: 100}}  
        startval = {10}
        min={0}
        max={10}
        maxDistance={3}
        unlockDistance={100}
        preciseMode={false}       
        rotateDegrees={180}
      />
    </div>
  )
}

export default App;
