import React, {useState} from 'react'
import {Paper} from '@material-ui/core'
import NewKnob from './NewKnob'
import FetchedStems from './FetchedStems'
import UploadForm from './UploadForm'

const App = ({audioObject}) => {
  // audioObject.setEnvelopeEnabled = setEnvelopeEnabled
  // audioObject.envelopeEnabled = envelopeEnabled

  // bind all methods of audioObject
  for(let key in audioObject) {
      if (typeof(audioObject[key]) == 'function') {
          audioObject[key] = audioObject[key].bind(audioObject)
      }
  }    

    // const[envelopeEnabled, setEnvelopeEnabled] = useState(false)
    const[uploadEnabled, setUploadEnabled] = useState(false)
    const[isPlaying, setIsPlaying] = useState(false)
    const[currentlyPlaying, setCurrentlyPlaying] = useState('piano')
    const[sampleDuration, setSampleDuration] = useState(audioObject.player.sampleTime)

    // const keys = (
    //   <>
    //   <h3>play synth with buttons</h3>
    //   <div>
    //     <button onClick={audioObject.playA}>A</button>
    //     <button onClick={audioObject.playB}>B</button>
    //     <button onClick={audioObject.playC}>C</button>
    //     <button onClick={audioObject.playD}>D</button>
    //     <button onClick={audioObject.playE}>E</button>
    //     <button onClick={audioObject.playF}>F</button>
    //     <button onClick={audioObject.playG}>G</button>
    //   </div>
    //   </>
    // )

    return (
        <Paper elevation={4} style={{backgroundColor: '#383838', padding: '40px 80px 80px 80px'}}>
        <div className={'interface'}>
          <h2 className={"title"}>grainstems</h2>
          <h3 className={"subtitle"}>a toy granular synth</h3>
          {
            !isPlaying 
            ? 
            <button disabled={!audioObject.isLoaded} onClick={() => {audioObject.startPlayer(); if (audioObject.player.state === 'started') setIsPlaying(true)}}>start</button>
            :
            <button onClick={() => {audioObject.stopPlayer(); setIsPlaying(false)}}>stop</button>
          }
          <br />
          <br />
          <h3> currently playing : <button>{currentlyPlaying}</button></h3>
          <h3>choose sample</h3> 
          <FetchedStems audioObject={audioObject} setCurrentlyPlaying = {setCurrentlyPlaying} setSampleDuration={setSampleDuration}/>
          <br />
          <br />
          <button onClick={() => setUploadEnabled(!uploadEnabled)}>{!uploadEnabled?"upload a sample":"collapse"}</button>
          {
            uploadEnabled ? <UploadForm /> : <br /> 
          }
          {/* <h3>{envelopeEnabled ? "turn off": "turn on"} envelope</h3>
          <button onClick={audioObject.toggleEnvelope} >_/\_</button>
          <br />
          <br />
          {envelopeEnabled ? keys : null} */}
          <table>
            <tbody>
              <tr>
                <NewKnob 
                  text={"grain size"}
                  onChange={(v) => {audioObject.player.grainSize = v / 10}}
                  show={v => Math.floor(10 * v) / 100}
                  units = {'s'}
                  startVal = {5}
                  min={0.1}
                  max={10}
                  diam={80}
                />
                <NewKnob 
                  text={"overlap"}
                  onChange={(v) => {audioObject.player.overlap = audioObject.player.grainSize * v / 10}}
                  show={v => Math.floor(10 * v)}
                  units = {'%'}
                  startVal = {5}
                  min={0.1}
                  max={10}
                  diam={80}
                />
                <NewKnob 
                  text={'tuning'}
                  show={v => Math.floor(v) / 100}
                  units={'semitones'}
                  onChange={(v) => {audioObject.player.detune = v}}
                  diam={80}
                  startVal={0}
                  min={-3600}
                  max={3600}
                />
                <td>
                  <h3>reverse</h3>
                  <button onClick={audioObject.setReverse} style={{marginLeft: 'auto', marginRight: 'auto', display:'block', width: '50%'}}>~</button>
                </td>
              </tr>
              <tr>
                <NewKnob 
                  text={'loop start'}
                  show={v => Math.floor(v * 100) / 100}
                  units={'s'}
                  onChange={(v) => {audioObject.player.loopStart = v}}
                  diam={80}
                  startVal={0}
                  min={0}
                  max={sampleDuration}
                />
                <NewKnob 
                  text={'loop end'}
                  show={v => Math.floor(v * 100) / 100}
                  units={'s'}
                  onChange={(v) => {audioObject.player.loopEnd = v}}
                  diam={80}
                  startVal={sampleDuration}
                  min={0}
                  max={sampleDuration}
                />
                <NewKnob 
                  text={'filter cutoff'}
                  show={v => Math.floor(2 ** (v + 5))}
                  units={'Hz'}
                  onChange={(v) => {audioObject.filter.frequency.rampTo(2 ** (v + 5))}}
                  diam={80}
                  startVal={10}
                  min={0}
                  max={10}
                />
                <NewKnob 
                  text={'sample speed'}
                  show={v => Math.floor((v ** 2) * 100)}
                  units={'%'}
                  onChange={(v) => audioObject.player.playbackRate = v ** 2 }
                  diam={80}
                  startVal={1}
                  min={0.1}
                  max={3}
                />                
              </tr>
            </tbody>
          </table>
        </div>
        </Paper>
    )
}

export default App