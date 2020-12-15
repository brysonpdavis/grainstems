import React, {useState} from 'react'
import * as skins from 'react-rotary-knob-skin-pack'
import TableDataLimitedKnob from './TableDataLimitedKnob'
import piano1 from '../stems/piano1.wav'
import piano2 from '../stems/piano2.wav'
import piano3 from '../stems/piano3.wav'

const App = ({audioObject}) => {
    const[envelopeEnabled, setEnvelopeEnabled] = useState(false)

    audioObject.setEnvelopeEnabled = setEnvelopeEnabled
    audioObject.envelopeEnabled = envelopeEnabled

    // bind all methods of audioObject
    for(let key in audioObject) {
        if (typeof(audioObject[key]) == 'function') {
            audioObject[key] = audioObject[key].bind(audioObject)
        }
    }    

    const keys = (
        <tr>
            <td>
                <button onClick={audioObject.playA}>A</button>
                <button onClick={audioObject.playB}>B</button>
            </td>
            <td>
                <button onClick={audioObject.playC}>C</button>
                <button onClick={audioObject.playD}>D</button>
                <button onClick={audioObject.playE}>E</button>
            </td>
            <td>
                <button onClick={audioObject.playF}>F</button>
                <button onClick={audioObject.playG}>G</button>
            </td>
        </tr>
        )

    const noteAboutKeys = (
        <h3>play synth with buttons</h3>
    ) 


    return (
        <div>
          <h2 className={"title"}>grainstems</h2>
          <h3 className={"subtitle"}>a toy granular synth</h3>
          <button disabled={!audioObject.isLoaded} onClick={audioObject.startPlayer}>start</button>
          <button onClick={audioObject.stopPlayer}>stop</button>
          <br />
          <br />
          <h3>choose sample</h3>
          <button onClick={()=>audioObject.resetGrainPlayer(piano1)}>x</button>
          <button onClick={()=>audioObject.resetGrainPlayer(piano2)}>y</button>
          <button onClick={()=>audioObject.resetGrainPlayer(piano3)}>z</button>
          <br />
          <h3>tuning</h3>
          <button onClick={audioObject.tuneDown}>down</button>
          <button onClick={audioObject.tuneUp}>up</button>
          <br />
          <h3>sample speed</h3>
          <button onClick={audioObject.sampleSpeedDown}>down</button>
          <button onClick={audioObject.sampleSpeedUp}>up</button>
          <br />
          <h3>reverse</h3>
          <button onClick={audioObject.setReverse} >~</button>
          <br />
          <h3>{envelopeEnabled ? "turn off": "turn on"} envelope</h3>
          <button onClick={audioObject.toggleEnvelope} >_/\_</button>
          <br />
          {envelopeEnabled ? noteAboutKeys : null}
          <br />
          <table style={{textAlign:"center"}}>
            <tbody>
              {envelopeEnabled ? keys : null}
              <tr>
                <TableDataLimitedKnob 
                  text={"grain size"}
                  skin={skins.s16}
                  change={{change: (v) => {audioObject.player.grainSize = v / 20}}}
                  style = {{width: 100, height: 100}}  
                  startval = {10}
                  min={1}
                  max={20}
                  maxDistance={4}
                  unlockDistance={100}
                  preciseMode={false}       
                  rotateDegrees={180}
                />
                <TableDataLimitedKnob 
                  text={"overlap"}
                  skin={skins.s16}
                  change={{change: (v) => {audioObject.player.overlap = audioObject.player.grainSize * v / 10}}}
                  style = {{width: 100, height: 100}}  
                  startval = {1}
                  min={1}
                  max={10}
                  maxDistance={3}
                  unlockDistance={100}
                  preciseMode={false}       
                  rotateDegrees={180}
                />
                <TableDataLimitedKnob 
                  text={"tuning"}
                  skin={skins.s16}
                  change={{change: (v) => {audioObject.player.detune = v}}}
                  style = {{width: 100, height: 100}}  
                  startval={0}
                  min={-3600}
                  max={3600}
                  maxDistance={600}
                  unlockDistance={100}
                  preciseMode={false}       
                  rotateDegrees={180}
                />
              </tr>
              <tr>
                <TableDataLimitedKnob 
                  text={"loop start"}
                  skin={skins.s16}
                  change={{change: (v) => {audioObject.player.loopStart = v}}}
                  style = {{width: 100, height: 100}}  
                  startval = {0}
                  min={0}
                  max={10}
                  maxDistance={3}
                  unlockDistance={100}
                  preciseMode={false}       
                  rotateDegrees={180}
                />
                <TableDataLimitedKnob 
                  text={"loop end"}
                  skin={skins.s16}
                  change={{change: (v) => {audioObject.player.loopEnd = v}}}
                  style = {{width: 100, height: 100}}  
                  startval = {10}
                  min={0}
                  max={10}
                  maxDistance={3}
                  unlockDistance={100}
                  preciseMode={false}       
                  rotateDegrees={180}
                />
                <TableDataLimitedKnob 
                  text={"filter cutoff"}
                  skin={skins.s16}
                  change={{change: (v) => {audioObject.filter.frequency.rampTo(2 ** (v + 5))}}}
                  style = {{width: 100, height: 100}}  
                  startval = {10}
                  min={0}
                  max={10}
                  maxDistance={3}
                  unlockDistance={100}
                  preciseMode={false}       
                  rotateDegrees={180}
                />
              </tr>
            </tbody>
          </table>
        </div>
    )
}

export default App